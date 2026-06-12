"use client";

import { useState } from "react";
import {
  BanknotesIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  PlusIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface Fund {
  id: string;
  name: string;
  type: string;
  invested: string;
  currentValue: string;
  performance: number;
  riskLevel: "low" | "medium" | "high";
  allocation: number;
  description: string;
}

export default function FundsPage() {
  const [funds] = useState<Fund[]>([
    {
      id: "1",
      name: "Global Equity Fund",
      type: "Equity",
      invested: "$25,000",
      currentValue: "$28,750",
      performance: 15.0,
      riskLevel: "medium",
      allocation: 45,
      description: "Diversified portfolio of global stocks and ETFs",
    },
    {
      id: "2",
      name: "Forex Trading Fund",
      type: "Forex",
      invested: "$15,000",
      currentValue: "$16,200",
      performance: 8.0,
      riskLevel: "high",
      allocation: 28,
      description: "Active currency trading across major pairs",
    },
    {
      id: "3",
      name: "Commodities Fund",
      type: "Commodities",
      invested: "$10,000",
      currentValue: "$10,500",
      performance: 5.0,
      riskLevel: "low",
      allocation: 18,
      description: "Gold, oil, and agricultural commodities",
    },
    {
      id: "4",
      name: "Crypto Growth Fund",
      type: "Cryptocurrency",
      invested: "$5,000",
      currentValue: "$5,800",
      performance: 16.0,
      riskLevel: "high",
      allocation: 9,
      description: "Digital assets and blockchain investments",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | string>("all");
  const [filterRisk, setFilterRisk] = useState<"all" | Fund["riskLevel"]>("all");

  const totalInvested = funds.reduce(
    (sum, fund) => sum + parseFloat(fund.invested.replace("$", "").replace(",", "")),
    0
  );
  const totalValue = funds.reduce(
    (sum, fund) => sum + parseFloat(fund.currentValue.replace("$", "").replace(",", "")),
    0
  );
  const totalPerformance = ((totalValue - totalInvested) / totalInvested) * 100;

  const filteredFunds = funds.filter((fund) => {
    const matchesSearch =
      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || fund.type === filterType;
    const matchesRisk = filterRisk === "all" || fund.riskLevel === filterRisk;
    return matchesSearch && matchesType && matchesRisk;
  });

  const uniqueTypes = Array.from(new Set(funds.map((f) => f.type)));

  const getRiskColor = (risk: Fund["riskLevel"]) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BanknotesIcon className="w-8 h-8 text-[#00a76f]" />
            My Funds
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
            Manage your investments across different funds and track performance.
          </p>
        </div>
        <Link
          href="/dashboard/trade"
          className="flex items-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-semibold transition shadow-sm hover:shadow-md"
        >
          <PlusIcon className="w-5 h-5" />
          Invest More
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalInvested.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Performance</p>
          <div className="flex items-center gap-2">
            {totalPerformance >= 0 ? (
              <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowTrendingDownIcon className="w-5 h-5 text-red-500" />
            )}
            <p
              className={`text-2xl font-bold ${
                totalPerformance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {totalPerformance >= 0 ? "+" : ""}
              {totalPerformance.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search funds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f] appearance-none"
              >
                <option value="all">All Types</option>
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as "all" | Fund["riskLevel"])}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a76f]"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Funds Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFunds.map((fund) => (
          <div
            key={fund.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {fund.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{fund.type}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getRiskColor(fund.riskLevel)}`}
              >
                {fund.riskLevel.charAt(0).toUpperCase() + fund.riskLevel.slice(1)} Risk
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {fund.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Invested</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {fund.invested}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Value</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {fund.currentValue}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                <div className="flex items-center gap-1">
                  {fund.performance >= 0 ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`font-semibold ${
                      fund.performance >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {fund.performance >= 0 ? "+" : ""}
                    {fund.performance}%
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Allocation</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {fund.allocation}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#00a76f] h-2 rounded-full transition-all"
                    style={{ width: `${fund.allocation}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={`/dashboard/funds/${fund.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition"
              >
                <ChartBarIcon className="w-4 h-4" />
                View Details
              </Link>
              <button className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <ArrowDownTrayIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFunds.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <BanknotesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No funds found matching your criteria.
          </p>
          <Link
            href="/dashboard/trade"
            className="inline-flex items-center gap-2 bg-[#00a76f] hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <PlusIcon className="w-5 h-5" />
            Start Investing
          </Link>
        </div>
      )}
    </div>
  );
}
