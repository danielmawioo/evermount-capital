"use client";

import Link from "next/link";

export default function InvestPage() {
  return (
    <main className="min-h-screen bg-[#f9fafb] dark:bg-[#0f1117] p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Explore Investment Opportunities
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Discover diverse global assets — from forex and stocks to precious
            metals and commodities. Grow your wealth with Evermount Capital.
          </p>
        </div>

        {/* Investment Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Forex */}
          <Link
            href="/dashboard/invest/forex"
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-md hover:scale-[1.03] transition-all duration-300 ease-in-out"
          >
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Global Forex
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Trade currencies in major global markets and maximize
              opportunities.
            </p>
          </Link>

          {/* Stocks */}
          <Link
            href="/dashboard/invest/stocks"
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-md hover:scale-[1.03] transition-all duration-300 ease-in-out"
          >
            <div className="text-4xl mb-4">📈</div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Global Stocks & ETFs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Invest in leading companies and diversify your portfolio across
              sectors.
            </p>
          </Link>

          {/* Commodities */}
          <Link
            href="/dashboard/invest/commodities"
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-md hover:scale-[1.03] transition-all duration-300 ease-in-out"
          >
            <div className="text-4xl mb-4">🏦</div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Commodities
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Hedge against inflation with investments in gold, oil, and
              agriculture.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
