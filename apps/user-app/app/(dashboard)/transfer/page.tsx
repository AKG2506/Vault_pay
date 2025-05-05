import db from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

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
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-full max-w-6xl mx-auto px-4  pb-6">
      {/* Heading with same size but minimal top padding */}
      <div className="text-4xl text-[#6a51a6] mb-4 font-bold">Transfer</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[90vh]">
        {/* Left Column - AddMoney + BalanceCard */}
        <div className="flex flex-col gap-4">
          <div className="p-4 border rounded-lg hover:shadow-md">
            <AddMoney />
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>
        </div>

        {/* Right Column - Transactions */}
        <div className="p-4 border rounded-lg hover:shadow-2xl overflow-y-auto max-h-full">
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
