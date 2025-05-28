import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AllTransactions } from "../../../components/AllTransactions";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      startTime: 'desc', 
    },
    
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const Txns = await db.p2PTransaction.findMany({
    where: {
      OR: [{ fromId: userId }, { toId: userId }],
    },
    orderBy: {
      timestamp: "desc",
    },
    include: {
      from: true, 
      to: true, 
    },
  }); 
  return Txns.map((txn: any) => ({
    time: txn.timestamp,
    amount: txn.amount,
    direction: txn.fromId === userId ? "sent" : "received" as "sent" | "received",
    from: txn.from.number,
    to: txn.to.number,
  }));
}

export default async function TransferPage() {
  const onRampTransactions = await getOnRampTransactions();
  const p2pTransactions = await getP2PTransactions();

  return (
    <div className="p-4 border rounded-lg hover:shadow-md h-full">

      <AllTransactions
        onRampTransactions={onRampTransactions}
        p2pTransactions={p2pTransactions}
        />

    </div>


  );
}
