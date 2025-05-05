import { Card } from "@repo/ui/card";

type TransactionStatus = "Success" | "Processing" | "Failure";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: TransactionStatus;
    provider: string;
  }[];
}) => {
  const statusColor: Record<TransactionStatus, string> = {
    Success: "text-green-400",
    Processing: "text-yellow-600",
    Failure: "text-red-500",
  };

  const amountColor: Record<TransactionStatus, string> = {
    Success: "text-green-400",
    Processing: "text-yellow-600",
    Failure: "text-red-500",
  };

  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 max-h-80 overflow-y space-y-4 pr-2">
        {transactions.map((t, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-3"
          >
            <div className="flex flex-col space-y-1">
              <div className="text-lg font-small">Received INR</div>
              <div className="text-slate-600 text-sm">
                {t.time.toDateString()}
              </div>
              <div className={`text-sm font-semibold ${statusColor[t.status]}`}>
                {t.status}
              </div>
            </div>
            <div
              className={`flex flex-col justify-center text-lg font-semibold ${amountColor[t.status]}`}
            >
              {t.status === "Success" ? "+" : ""}
              ₹{(t.amount / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
