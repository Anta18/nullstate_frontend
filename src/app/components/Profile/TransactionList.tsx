import React from "react";

export interface Transaction {
  type: string;
  action: string;
  date: string;
  amount: string;
  hasView: boolean;
}

interface TransactionListProps {
  transactions: Transaction[];
  filter: string;
  typeColors: Record<string, string>;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  filter,
  typeColors,
}) => {
  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "All activity") return true;
    if (filter === "Transfers") {
      return tx.type === "transferred" || tx.type === "received";
    }
    if (filter === "NFTs") {
      return tx.type === "bought";
    }
    if (filter === "dApps") {
      return tx.type === "set";
    }
    return true;
  });

  return (
    <div className="space-y-2">
      {filteredTransactions.map((tx, index) => (
        <div
          key={index}
          className="bg-[#1b1c1d] rounded-xl p-4 flex justify-between items-center"
        >
          {/* Left content */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{tx.type}</span>
              <span className="font-medium">{tx.action.split(" ")[0]}</span>
              <span className="text-gray-400">
                {tx.action.split(" ").slice(1).join(" ")}
              </span>
            </div>
            <div className="text-xs text-gray-500">{tx.date}</div>
          </div>

          {/* Right content with aligned line */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div
                className="w-0.5 h-10"
                style={{
                  backgroundColor: typeColors[tx.type] || "#ccc",
                }}
              ></div>
              <div className="ml-2 font-medium">{tx.amount}</div>
            </div>
            <button>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
