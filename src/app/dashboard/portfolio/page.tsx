"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api-client";
import TradingMetricsGrid from "../components/TradingMetricsGrid";
import EquityCurveChart from "../components/EquityCurveChart";

interface Holding {
  id: string;
  assetName: string;
  symbol: string;
  strategyKey?: string;
  value: number;
  return: number;
  returnPercent: number;
  type: string;
  lockInMonths?: number | null;
  lockInEndsAt?: string | null;
  allocationReason?: string | null;
}

interface PortfolioData {
  totalValue: number;
  totalInvested: number;
  totalReturn: number;
  totalReturnPercent: number;
  holdings: Holding[];
}

interface PerformanceData {
  equityCurve: { date: string; equity: number }[];
  metrics: {
    gainPercent: number;
    absGain: number;
    dailyPercent: number;
    monthlyPercent: number;
    maxDrawdown: number;
    volatility: number;
    sharpeRatio: number | null;
    balance: number;
    equity: number;
  };
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    loadPortfolio(period);
  }, [period]);

  const loadPortfolio = async (selectedPeriod: string) => {
    setLoading(true);
    try {
      const [portfolioRes, perfRes] = await Promise.all([
        api.portfolio.get(),
        api.portfolio.getPerformance({ period: selectedPeriod }),
      ]);
      setPortfolio(portfolioRes.data);
      setPerformance(perfRes.data);
      setError(null);
    } catch {
      setError("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  const formatUsd = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Portfolio
        </h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Portfolio
        </h1>
        <p className="text-red-500">{error || "No data"}</p>
      </div>
    );
  }

  const metrics = performance?.metrics ?? {
    gainPercent: portfolio.totalReturnPercent,
    absGain: portfolio.totalReturn,
    dailyPercent: 0,
    monthlyPercent: 0,
    maxDrawdown: 0,
    volatility: 0,
    sharpeRatio: null,
    balance: portfolio.totalValue,
    equity: portfolio.totalValue,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            Holdings and performance from live strategy NAV
          </p>
        </div>
        <Link
          href="/dashboard/trade"
          className="inline-flex items-center justify-center rounded-lg bg-[#00a76f] text-white text-sm font-semibold px-4 py-2 hover:bg-[#008f5d] transition"
        >
          Add investment
        </Link>
      </div>

      <div className="flex gap-2">
        {[
          { label: "7D", value: "7d" },
          { label: "30D", value: "30d" },
          { label: "90D", value: "90d" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setPeriod(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              period === tab.value
                ? "bg-[#00a76f] text-white"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <TradingMetricsGrid metrics={metrics} />

      <div className="bg-white dark:bg-[#161a23] rounded-xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">
          Equity Curve
        </h3>
        <EquityCurveChart data={performance?.equityCurve ?? []} />
      </div>

      {portfolio.holdings.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            No active investments.{" "}
            <Link href="/dashboard/trade" className="text-[#00a76f] hover:underline">
              Start trading
            </Link>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Holdings
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.holdings.map((asset) => (
              <div
                key={asset.id}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {asset.assetName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {asset.type}
                      {asset.strategyKey ? ` · ${asset.strategyKey}` : ""}
                    </p>
                    {asset.lockInEndsAt && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Locked until{" "}
                        {new Date(asset.lockInEndsAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      asset.returnPercent >= 0
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {asset.returnPercent >= 0 ? "+" : ""}
                    {asset.returnPercent.toFixed(2)}%
                  </span>
                </div>
                <p className="mt-3 text-xl font-bold text-[#00a76f] tabular-nums">
                  {formatUsd(asset.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
