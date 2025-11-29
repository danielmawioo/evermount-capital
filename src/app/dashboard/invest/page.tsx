"use client";

import Link from "next/link";
import {
  GlobeAltIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

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
            Access institutional-grade quantitative strategies across multiple asset classes. 
            Systematic allocation designed to generate alpha while managing risk.
          </p>
        </div>

        {/* Investment Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Forex */}
          <Link
            href="/dashboard/invest/forex"
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out"
          >
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <GlobeAltIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Global Forex
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Systematic currency strategies across major and emerging market pairs.
            </p>
          </Link>

          {/* Stocks */}
          <Link
            href="/dashboard/invest/stocks"
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out"
          >
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <ChartBarIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Global Stocks & ETFs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Quantitative equity strategies with systematic factor exposure and sector rotation.
            </p>
          </Link>

          {/* Commodities */}
          <Link
            href="/dashboard/invest/commodities"
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out"
          >
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <BuildingLibraryIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Commodities
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Systematic commodity strategies for portfolio diversification and inflation hedging.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
