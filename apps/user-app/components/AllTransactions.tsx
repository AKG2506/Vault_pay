import { Card } from "@repo/ui/card";

type TransactionStatus = "Success" | "Processing" | "Failure";

interface UnifiedTransaction {
  time: Date;
  amount: number;
  status: TransactionStatus;
  provider: string;
  type: "onramp" | "p2p";
  direction?: "sent" | "received"; // for p2p
  from?: string; // for p2p
  to?: string;   // for p2p
}

export const AllTransactions = ({
  onRampTransactions,
  p2pTransactions,
}: {
  onRampTransactions: {
    time: Date;
    amount: number;
    status: TransactionStatus;
    provider: string;
  }[];
  p2pTransactions: {
    time: Date;
    amount: number;
    direction: "sent" | "received";
    from: string;
    to: string;
  }[];
}) => {
  const statusColor: Record<TransactionStatus, string> = {
    Success: "text-green-400",
    Processing: "text-yellow-600",
    Failure: "text-red-500",
  };

  const unifiedTransactions: UnifiedTransaction[] = [
    ...p2pTransactions.map((t) => ({
      ...t,
      status: "Success" as TransactionStatus,
      provider: t.direction === "received" ? "P2P Received" : "P2P Sent",
      type: "p2p" as const,
    })),
    ...onRampTransactions.map((t) => ({
      ...t,
      type: "onramp" as const,
    })),
  ].sort((a, b) => b.time.getTime() - a.time.getTime());

  if (!unifiedTransactions.length) {
    return (
      <Card title="All Transactions">
        <div className="text-center py-8">No transactions</div>
      </Card>
    );
  }

  return (
    <Card title="All Transactions">
      <div className="mt-4 pt-2 max-h-[525px] overflow-y-auto space-y-4 pr-2">
        {unifiedTransactions.map((t, idx) => {
          const isP2PSent = t.type === "p2p" && t.direction === "sent";
          const transactionTag =
            t.type === "onramp"
              ? "Received INR"
              : t.direction === "received"
              ? "P2P Received"
              : "P2P Sent";

          const amountColor = isP2PSent
            ? "text-red-500"
            : statusColor[t.status];

          const sign =
            t.type === "onramp" || t.direction === "received" ? "+" : "-";

          return (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex flex-col space-y-1">
                <div className="text-lg font-medium">{transactionTag}</div>

                {t.type === "p2p" ? (
                  <div className="text-sm text-gray-600">
                    {t.direction === "received"
                      ? `Received from: ${t.from}`
                      : `Sent to: ${t.to}`}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    via {t.provider}
                  </div>
                )}

                <div className="text-slate-600 text-sm">
                  {t.time.toLocaleString()}
                </div>

                <div
                  className={`text-sm font-semibold ${statusColor[t.status]}`}
                >
                  {t.status}
                </div>
              </div>

              <div
                className={`flex flex-col justify-center text-lg font-semibold ${amountColor}`}
              >
                {sign + "₹" + t.amount.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
