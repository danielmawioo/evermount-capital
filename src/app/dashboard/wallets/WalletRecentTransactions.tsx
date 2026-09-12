"use client";

import Link from "next/link";
import {
  CheckCircleIcon,
  ClockIcon,
  WalletIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  formatCurrency,
  formatStatusLabel,
  getTransactionTypeLabel,
  isCreditTransaction,
} from "@/lib/format";
import type { WalletTransaction } from "@/hooks/useWallet";

function StatusIcon({ status }: { status: string }) {
  switch (status.toLowerCase()) {
    case "completed":
    case "success":
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case "pending":
    case "processing":
      return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    case "failed":
    case "rejected":
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    default:
      return <ClockIcon className="w-5 h-5 text-gray-400" />;
  }
}

type Props = {
  transactions: WalletTransaction[];
  loading: boolean;
};

export default function WalletRecentTransactions({
  transactions,
  loading,
}: Props) {
  return (
    <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>
        <Link
          href="/dashboard/wallets/history"
          className="text-sm text-[#00a76f] hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8">
          <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No transactions yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Start by making a deposit to your wallet
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const credit = isCreditTransaction(transaction.type);
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-4">
                  <StatusIcon status={transaction.status} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getTransactionTypeLabel(transaction.type)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                    {transaction.description ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {transaction.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      credit
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {credit ? "+" : "-"}
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                    {formatStatusLabel(transaction.status)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
