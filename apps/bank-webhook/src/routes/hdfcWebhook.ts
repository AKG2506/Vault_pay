import { Router } from "express";
import db from "@repo/db/client";
import { z } from "zod";

const router = Router();

const webhookSchema = z.object({
  token: z.string(),
  user_identifier: z.number(),
  amount: z.string(),
  status: z.enum(["Success", "Failed", "Processing"])
});

router.post("/", async (req:any, res:any) => {
  const result = webhookSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid payload", errors: result.error.errors });
  }

  const { token, user_identifier, amount, status } = result.data;

  try {
    const txResult = await db.$transaction(async (tx) => {
      const existing = await tx.onRampTransaction.findUnique({ where: { token } });

      if (!existing) throw new Error("TransactionNotFound");
      
      if (existing.userId !== user_identifier) {
        throw new Error("UserMismatch");
      }

      if (existing.status === "Success") {
        return { status: "AlreadySuccess" };
      }

      if (Number(amount) !== Number(existing.amount)) {
        throw new Error("AmountMismatch");
      }

      if (status === "Failed") {
        await tx.onRampTransaction.update({
          where: { token },
          data: { status: "Failure" }
        });
        return { status: "MarkedFailed" };
      }

      if (status === "Success") {
        await tx.balance.updateMany({
          where: { userId: Number(user_identifier) },
          data: { amount: { increment: Number(amount) } }
        });

        await tx.onRampTransaction.update({
          where: { token },
          data: { status: "Success" }
        });

        return { status: "Captured" };
      }

      // Handle other bank statuses like "Pending", "Processing"
      await tx.onRampTransaction.update({
        where: { token },
        data: { status }
      });

      return { status: "Deferred" };
    });

    // Final response after transaction
    switch (txResult.status) {
      case "AlreadySuccess":
        return res.status(200).json({ message: "Already captured" });
      case "MarkedFailed":
        return res.status(200).json({ message: "Transaction marked as failed" });
      case "Captured":
        return res.status(200).json({ message: "Captured" });
      case "Deferred":
        return res.status(202).json({ message: "Pending or Processing" });
      default:
        return res.status(500).json({ message: "Unhandled status" });
    }
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "TransactionNotFound") {
        return res.status(404).json({ message: "Transaction not found" });
      }
      if (err.message === "AmountMismatch") {
        return res.status(400).json({ message: "Incorrect amount" });
      }
      if (err.message === "UserMismatch") {
        return res.status(403).json({ message: "User identifier does not match transaction" });
      }
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
