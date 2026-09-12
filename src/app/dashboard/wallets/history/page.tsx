"use client";

import TranslateTree from "@/app/components/TranslateTree";
import Link from "next/link";
import { ArrowLeftIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { useWalletHistory } from "@/hooks/useWalletHistory";
import {
  formatCurrency,
  formatStatusLabel,
  getStatusBadgeClass,
  getTransactionIcon,
  getTransactionTypeLabel,
  isCreditTransaction,
} from "@/lib/format";

export default function WalletHistoryPage() {
  const {
    transactions,
    loading,
    filters,
    pagination,
    hasActiveFilters,
    handleFilterChange,
    clearFilters,
    goToPreviousPage,
    goToNextPage,
  } = useWalletHistory();

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/dashboard/wallets"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Wallet
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Transaction History
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              View all your wallet transactions and activity
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FunnelIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="investment">Investment</option>
                <option value="profit-withdrawal">Profit Withdrawal</option>
                <option value="transfer-to-investment">
                  Transfer to Investment
                </option>
                <option value="dividend">Dividend</option>
                <option value="fee">Fee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
            </div>
          </div>
          {hasActiveFilters ? (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-[#00a76f] hover:underline"
            >
              Clear Filters
            </button>
          ) : null}
        </div>

        <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a76f] mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading transactions...
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No transactions found
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Try adjusting your filters or make your first deposit
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {getTransactionTypeLabel(transaction.type)}
                              </p>
                              {transaction.description ? (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {transaction.description}
                                </p>
                              ) : null}
                              {transaction.metadata?.method ? (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  via {transaction.metadata.method}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p
                            className={`text-sm font-semibold ${
                              isCreditTransaction(transaction.type)
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {isCreditTransaction(transaction.type) ? "+" : "-"}
                            {formatCurrency(
                              transaction.amount,
                              transaction.currency,
                            )}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                              transaction.status,
                            )}`}
                          >
                            {formatStatusLabel(transaction.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pagination.total > pagination.limit ? (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )}{" "}
                    of {pagination.total} transactions
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={
                        pagination.page * pagination.limit >= pagination.total
                      }
                      className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </TranslateTree>
  );
}
