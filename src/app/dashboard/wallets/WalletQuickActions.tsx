"use client";

import Link from "next/link";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function WalletQuickActions() {
  return (
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
            <p className="font-semibold text-gray-900 dark:text-white">
              Deposit
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Add funds to wallet
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/withdraw"
          className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition border border-red-200 dark:border-red-800"
        >
          <ArrowUpTrayIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Withdraw
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Withdraw from wallet
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/trade"
          className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition border border-blue-200 dark:border-blue-800"
        >
          <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Invest
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Transfer to investment
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/wallets/history"
          className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition border border-gray-200 dark:border-gray-700"
        >
          <ClockIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              History
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              View all transactions
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
