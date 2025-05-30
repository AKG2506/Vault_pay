"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromUserId = Number(session?.user?.id);

  if (!fromUserId) {
    return { status: "error", message: "Unauthorized. Please log in." };
  }

  if (!to || typeof to !== "string" || !/^\d{10}$/.test(to)) {
    return { status: "error", message: "Invalid recipient number format." };
  }

  if (!Number.isInteger(amount) || amount <= 0) {
    return {
      status: "error",
      message: "Amount must be a positive integer.",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: { number: to },
  });

  if (!toUser) {
    return { status: "error", message: "Recipient user not found." };
  }

  if (toUser.id === fromUserId) {
    return { status: "error", message: "Cannot transfer to yourself." };
  }

  try {
    await prisma.$transaction(async (tx:any) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: fromUserId },
      });
      // Introduce a custom delay (e.g., 2 seconds)
      // await new Promise((resolve) => setTimeout(resolve, 3000));

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient balance.");
      }

      // Decrement sender balance
      await tx.balance.update({
        where: { userId: fromUserId },
        data: { amount: { decrement: amount } },
      });

      // Increment recipient balance
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Create the transaction record with proper relations
      await tx.p2PTransaction.create({
        data: {
          fromId: fromUserId,
          toId: toUser.id,
          amount,
        },
      });
    });

    return {
      status: "success",
      message: `₹${amount} sent to ${toUser.number} successfully.`,
    };
  } catch (err) {
    console.error("P2P Transfer Error:", err);
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong during the transfer.",
    };
  }
}
