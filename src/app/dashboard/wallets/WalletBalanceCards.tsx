"use client";

import {
  ChartBarIcon,
  ClockIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/format";
import type { WalletBalance } from "@/hooks/useWallet";

type Props = { balance: WalletBalance | null };

export default function WalletBalanceCards({ balance }: Props) {
  const currency = balance?.currency ?? "USD";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Available Balance
          </h3>
          <WalletIcon className="w-5 h-5 text-[#00a76f]" />
        </div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {balance
            ? formatCurrency(balance.availableBalance, currency)
            : "$0.00"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Funds available for withdrawal or investment
        </p>
      </div>
      <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total Balance
          </h3>
          <ChartBarIcon className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {balance ? formatCurrency(balance.totalBalance, currency) : "$0.00"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Wallet + Invested funds
        </p>
      </div>
      <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Invested
          </h3>
          <ChartBarIcon className="w-5 h-5 text-purple-500" />
        </div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {balance
            ? formatCurrency(balance.investedBalance, currency)
            : "$0.00"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Active investments
        </p>
      </div>
      <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pending
          </h3>
          <ClockIcon className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
          {balance ? formatCurrency(balance.pendingBalance, currency) : "$0.00"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Transactions in progress
        </p>
      </div>
    </div>
  );
}
