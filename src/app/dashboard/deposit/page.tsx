"use client";

import Link from "next/link";

export default function DepositPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Deposit Funds
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose your preferred deposit method to add funds to your wallet. Funds will be available for withdrawal or investment.
        </p>
      </div>

      {/* Deposit Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Deposit */}
        <Link
          href="/dashboard/deposit/card"
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
        >
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 7h20M2 12h20M7 17h10"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Card Payment
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
            Use your Visa, Mastercard, or Amex to deposit.
          </p>
        </Link>

        {/* Crypto Deposit */}
        <Link
          href="/dashboard/deposit/crypto"
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
        >
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Crypto Payment
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
            Deposit with Bitcoin, Ethereum, and more.
          </p>
        </Link>

        {/* Bank Transfer */}
        <Link
          href="/dashboard/deposit/bank"
          className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M5 6h14M4 14h16v6H4z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Bank Transfer
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-center">
            Send directly to our bank account.
          </p>
        </Link>
      </div>
    </div>
  );
}
