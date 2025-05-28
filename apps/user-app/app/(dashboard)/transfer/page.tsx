import db from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { Transactions } from "../../../components/Transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { format } from "path";
async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

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
  const balance = await getBalance();
  const onRampTransactions = await getOnRampTransactions();
  const p2pTransactions = await getP2PTransactions();

  return (
    
    <div className="w-full max-w-6xl mx-auto px-4 pb-6 min-h-[600px]">
  {/* Heading */}
  <div className="text-4xl text-[#6a51a6] mb-4 font-bold">Transfer</div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
    {/* Left Column */}
    <div className="flex flex-col gap-4 h-full">
      <div className="p-4 border rounded-lg hover:shadow-md">
        <AddMoney />
      </div>
      <div className="p-4 border rounded-lg hover:shadow-md flex-grow">
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>
    </div>

    {/* Right Column */}
    <div className="p-4 border rounded-lg hover:shadow-md h-full">
      <Transactions
        onRampTransactions={onRampTransactions}
        p2pTransactions={p2pTransactions}
      />
    </div>
  </div>
</div>



  );
}
