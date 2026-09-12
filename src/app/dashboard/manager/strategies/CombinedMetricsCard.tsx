"use client";

import { formatCurrency, formatPct } from "@/lib/format";
import type { CombinedMetrics } from "@/hooks/useManagerStrategies";

type Props = { combined: CombinedMetrics };

export default function CombinedMetricsCard({ combined }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Combined Portfolio Metrics
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          AUM-weighted across {combined.strategyCount} strategies
          {combined.primaryStrategy ? (
            <>
              {" "}
              · Running: <strong>{combined.primaryStrategy}</strong>
            </>
          ) : null}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700">
        {[
          {
            label: "Total AUM",
            value: formatCurrency(combined.totalPoolAum, "USD", {
              maximumFractionDigits: 0,
            }),
          },
          {
            label: "Blended NAV",
            value: combined.blendedNavPerUnit.toFixed(4),
          },
          {
            label: "Daily return",
            value: formatPct(combined.weightedDailyReturnPct),
            color:
              combined.weightedDailyReturnPct >= 0
                ? "text-green-600"
                : "text-red-600",
          },
          {
            label: "Cumulative",
            value: formatPct(combined.weightedCumulativeReturnPct),
            color:
              combined.weightedCumulativeReturnPct >= 0
                ? "text-green-600"
                : "text-red-600",
          },
          {
            label: "Active / Total",
            value: `${combined.activeCount} / ${combined.strategyCount}`,
          },
          {
            label: "Investors",
            value: String(combined.totalInvestors),
          },
        ].map((m) => (
          <div key={m.label} className="px-4 py-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
              {m.label}
            </p>
            <p
              className={`text-lg font-bold tabular-nums ${m.color ?? "text-gray-900 dark:text-white"}`}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap gap-4 text-xs text-gray-500">
        <span>
          Quant:{" "}
          <span
            className={
              combined.quantConnected ? "text-green-600" : "text-red-600"
            }
          >
            {combined.quantConnected ? "Connected" : "Offline"}
          </span>
        </span>
        <span>
          Flipbot:{" "}
          <span
            className={
              combined.flipbotConnected ? "text-green-600" : "text-red-600"
            }
          >
            {combined.flipbotConnected ? "Connected" : "Offline"}
          </span>
        </span>
        <span>Mode: {combined.tradingMode ?? "—"}</span>
        {combined.killSwitchActive ? (
          <span className="text-red-600 font-medium">Kill switch active</span>
        ) : null}
      </div>
    </div>
  );
}
