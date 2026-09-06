"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { logger } from "@/lib/logger";

interface RiskMetrics {
  maxDrawdown: number;
  volatility: number;
  sharpeRatio: number | null;
}

export default function RiskMetricsPage() {
  const [metrics, setMetrics] = useState<RiskMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api.portfolio
      .getPerformance({ period: "90d" })
      .then((res) => {
        if (cancelled) return;
        setMetrics(res.data?.metrics ?? null);
        setError(null);
      })
      .catch((err) => {
        logger.error("Failed to load risk metrics", err);
        if (!cancelled) setError("Failed to load risk metrics");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const rows = metrics
    ? [
        { name: "Max Drawdown", value: `${metrics.maxDrawdown.toFixed(2)}%` },
        { name: "Volatility", value: `${metrics.volatility.toFixed(2)}%` },
        {
          name: "Sharpe Ratio",
          value:
            metrics.sharpeRatio !== null
              ? metrics.sharpeRatio.toFixed(2)
              : "N/A",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Risk Metrics Overview
      </h1>

      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
        Drawdown, volatility, and Sharpe ratio computed from your own
        portfolio&apos;s daily returns over the last 90 days.
      </p>

      {loading && (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      )}

      {!loading && (error || !metrics) && (
        <p className="text-red-500">{error || "No data available yet."}</p>
      )}

      {!loading && metrics && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((metric, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition p-6"
            >
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                {metric.name}
              </h2>
              <div className="text-2xl font-bold text-[#00a76f] dark:text-green-400">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
