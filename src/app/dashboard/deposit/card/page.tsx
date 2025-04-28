"use client";

import Link from "next/link";

export default function CardDepositPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Card Deposit
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Securely fund your wallet using Visa or Mastercard.
      </p>

      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm max-w-lg mx-auto">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CVV
              </label>
              <input
                type="password"
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00a76f] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00a76f] hover:bg-[#029866] text-white py-3 rounded-lg font-semibold transition"
          >
            Deposit Funds
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <Link href="/dashboard/deposit" className="hover:underline">
          ← Back to Deposit Methods
        </Link>
      </div>
    </div>
  );
}
