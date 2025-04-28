"use client";

import Link from "next/link";

export default function WalletsPage() {
  return (
    <div className="space-y-10">
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Wallets
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Manage your wallet balances, top-up, withdrawals, and set financial
          goals effortlessly.
        </p>
      </div>

      {/* Balance Section */}
      <div className="bg-white dark:bg-[#161a23] border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-1">
            Current Balance
          </h2>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
            $0.00
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/deposit"
            className="inline-flex items-center px-5 py-2.5 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-md font-semibold transition"
          >
            + Deposit
          </Link>
          <Link
            href="/dashboard/withdraw"
            className="inline-flex items-center px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md font-semibold transition"
          >
            - Withdraw
          </Link>
        </div>
      </div>

      {/* Wallet Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top-up Wallet */}
        <Link
          href="/dashboard/deposit"
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 4v16m8-8H4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Top Up Wallet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Add funds to your Evermount wallet easily.
          </p>
        </Link>

        {/* Withdraw Funds */}
        <Link
          href="/dashboard/withdraw"
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M12 20V4m-8 8h16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Withdraw Funds
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Withdraw securely anytime.
          </p>
        </Link>

        {/* Goals Wallet */}
        <Link
          href="/dashboard/wallets/goals"
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Goals Wallet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Save towards your dreams securely.
          </p>
        </Link>
      </div>
    </div>
  );
}
