"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";
import { getApiErrorMessage } from "@/lib/api-error";
import { logger } from "@/lib/logger";
import {
  WalletIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface WalletBalance {
  totalBalance: number;
  availableBalance: number;
  pendingBalance: number;
  investedBalance: number;
  currency: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  description?: string;
  createdAt: string;
}

export default function WalletsPage() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const { data } = await api.wallets.getBalance();
      setBalance(data);
    } catch (error: unknown) {
      logger.error("Failed to fetch wallet balance", error);
      // Set default values if API fails
      setBalance({
        totalBalance: 0,
        availableBalance: 0,
        pendingBalance: 0,
        investedBalance: 0,
        currency: "USD",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    try {
      const { data } = await api.wallets.getHistory({ limit: 10 });
      setTransactions(data.transactions || []);
    } catch (error: unknown) {
      logger.error("Failed to fetch wallet transactions", error);
      toast.error(getApiErrorMessage(error, "Failed to load transaction history"));
    } finally {
      setTransactionsLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
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
  };

  const getTransactionTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      deposit: "Deposit",
      withdrawal: "Withdrawal",
      investment: "Investment",
      "profit-withdrawal": "Profit Withdrawal",
      "transfer-to-investment": "Transferred to Investment",
      dividend: "Dividend",
      fee: "Fee",
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Wallet & Escrow
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Manage your wallet balance, deposits, withdrawals, and transfer funds to investments.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance (Wallet/Escrow) */}
        <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Available Balance
            </h3>
            <WalletIcon className="w-5 h-5 text-[#00a76f]" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {balance ? formatCurrency(balance.availableBalance, balance.currency) : "$0.00"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Funds available for withdrawal or investment
          </p>
        </div>

        {/* Total Balance */}
        <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Balance
            </h3>
            <ChartBarIcon className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {balance ? formatCurrency(balance.totalBalance, balance.currency) : "$0.00"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Wallet + Invested funds
          </p>
        </div>

        {/* Invested Balance */}
        <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Invested
            </h3>
            <ChartBarIcon className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {balance ? formatCurrency(balance.investedBalance, balance.currency) : "$0.00"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Active investments
          </p>
        </div>

        {/* Pending Balance */}
        <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending
            </h3>
            <ClockIcon className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {balance ? formatCurrency(balance.pendingBalance, balance.currency) : "$0.00"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Transactions in progress
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/deposit"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition border border-green-200 dark:border-green-800"
          >
            <ArrowDownTrayIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Deposit</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Add funds to wallet</p>
            </div>
          </Link>

          <Link
            href="/dashboard/withdraw"
            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition border border-red-200 dark:border-red-800"
          >
            <ArrowUpTrayIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Withdraw</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Withdraw from wallet</p>
            </div>
          </Link>

          <Link
            href="/dashboard/trade"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition border border-blue-200 dark:border-blue-800"
          >
            <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Invest</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Transfer to investment</p>
            </div>
          </Link>

          <Link
            href="/dashboard/wallets/history"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition border border-gray-200 dark:border-gray-700"
          >
            <ClockIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">History</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">View all transactions</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
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

        {transactionsLoading ? (
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
            <p className="text-gray-600 dark:text-gray-400">No transactions yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Start by making a deposit to your wallet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getTransactionTypeLabel(transaction.type)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {transaction.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {transaction.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "deposit" ||
                      transaction.type === "dividend" ||
                      transaction.type === "profit-withdrawal"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "deposit" ||
                    transaction.type === "dividend" ||
                    transaction.type === "profit-withdrawal"
                      ? "+"
                      : "-"}
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          About Your Wallet
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2 list-disc list-inside">
          <li>
            Your wallet acts as an escrow account where you can safely store funds before investing
          </li>
          <li>
            Deposits go directly to your wallet and are available for withdrawal or investment
          </li>
          <li>
            Withdrawn profits from investments are automatically added to your wallet balance
          </li>
          <li>
            You can transfer funds from your wallet to investments at any time
          </li>
          <li>
            All payment methods (card, bank, crypto) can be used for deposits and withdrawals
          </li>
        </ul>
      </div>
    </div>
  );
}
