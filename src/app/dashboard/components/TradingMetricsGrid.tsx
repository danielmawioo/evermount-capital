"use client";

import TranslateTree from "@/app/components/TranslateTree";

interface TradingMetrics {
  gainPercent: number;
  absGain: number;
  dailyPercent: number;
  monthlyPercent: number;
  maxDrawdown: number;
  volatility: number;
  sharpeRatio: number | null;
  balance: number;
  equity: number;
}

interface TradingMetricsGridProps {
  metrics: TradingMetrics;
  currency?: string;
}

function formatUsd(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatPct(value: number, showSign = true) {
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function MetricCell({
  label,
  value,
  valueClassName = "text-gray-900 dark:text-white",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <TranslateTree>
      <div className="px-4 py-3 border-r border-b border-gray-100 dark:border-gray-800 last:border-r-0">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </p>
        <p className={`text-lg font-bold tabular-nums ${valueClassName}`}>
          {value}
        </p>
      </div>
    </TranslateTree>
  );
}

export default function TradingMetricsGrid({
  metrics,
  currency = "USD",
}: TradingMetricsGridProps) {
  const gainColor =
    metrics.gainPercent >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <TranslateTree>
      <div className="bg-white dark:bg-[#161a23] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
            Account Summary
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Performance metrics similar to verified trading accounts
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          <MetricCell
            label="Gain"
            value={formatPct(metrics.gainPercent)}
            valueClassName={gainColor}
          />
          <MetricCell
            label="Abs. Gain"
            value={formatUsd(metrics.absGain, currency)}
            valueClassName={gainColor}
          />
          <MetricCell
            label="Daily"
            value={formatPct(metrics.dailyPercent)}
            valueClassName={
              metrics.dailyPercent >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          />
          <MetricCell
            label="Monthly"
            value={formatPct(metrics.monthlyPercent)}
            valueClassName={
              metrics.monthlyPercent >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          />
          <MetricCell
            label="Drawdown"
            value={formatPct(metrics.maxDrawdown, false)}
            valueClassName="text-red-600 dark:text-red-400"
          />
          <MetricCell
            label="Balance"
            value={formatUsd(metrics.balance, currency)}
          />
          <MetricCell
            label="Equity"
            value={formatUsd(metrics.equity, currency)}
          />
          <MetricCell
            label="Sharpe"
            value={
              metrics.sharpeRatio != null ? metrics.sharpeRatio.toFixed(2) : "—"
            }
          />
        </div>
      </div>
    </TranslateTree>
  );
}
