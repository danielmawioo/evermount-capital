"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";

interface WalletTransaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  reference?: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.wallets.getHistory({ page, limit });
      setTransactions(data.transactions || []);
      setTotal(data.total || 0);
    } catch (error: unknown) {
      logger.error("Failed to load transactions", error);
      toast.error(getApiErrorMessage(error, "Failed to load transactions"));
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const formatCurrency = (amount: number, currency = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusClass = (status: string) => {
    const s = status.toLowerCase();
    if (s === "success" || s === "completed") {
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    }
    if (s === "pending" || s === "processing") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    }
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  };

  return (
    <TranslateTree>
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Transaction History
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          All wallet deposits, withdrawals, investments, and adjustments.
        </p>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full text-sm bg-white dark:bg-gray-900 text-left border border-gray-100 dark:border-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Type</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200 divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No transactions yet. Make a deposit or investment to get
                  started.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4 whitespace-nowrap">
                    {formatDate(txn.createdAt)}
                  </td>
                  <td className="p-4 capitalize">
                    {txn.type.replace(/_/g, " ")}
                  </td>
                  <td className="p-4">
                    {txn.description || txn.reference || "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass(txn.status)}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold whitespace-nowrap">
                    {formatCurrency(txn.amount, txn.currency)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {total > limit && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
            {total}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page * limit >= total}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
      </TranslateTree>
  );
}
