"use client";

import TranslateTree from "@/app/components/TranslateTree";

export interface AllocationPreview {
  programName: string;
  strategyKey: string | null;
  riskLevel: string;
  amount: number;
  currency: string;
  availableBalance: number;
  totalInvested: number;
  totalPortfolioValue: number;
  balanceAfterAllocation: number;
  allocationPctOfPortfolio: number;
  strategyExposureAfterPct: number;
  lockInMonths: number;
  lockInEndsAt: string;
  planType: string;
  clientRiskTolerance: string;
  minInvestment: number;
  meetsMinimum: boolean;
  sufficientFunds: boolean;
  canAllocate: boolean;
  riskLeverage: number;
  effectiveExposure: number;
  maxRiskBudgetPct: number;
  maxRiskBudgetUsd: number;
  poolAum: number;
  poolSharePct: number;
  navPerUnit: number;
  strategyDailyReturnPct: number;
  strategyCumulativeReturnPct: number;
  warnings: string[];
}

function formatUsd(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: n >= 1000 ? 0 : 2,
  }).format(n);
}

function formatPct(n: number, digits = 2) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}

function formatRisk(risk: string) {
  return risk
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
}

function Metric({
  label,
  value,
  sub,
  valueClass,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <TranslateTree>
      <div className="px-3 py-2.5 border-r border-b border-gray-100 dark:border-gray-800">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm font-semibold tabular-nums ${valueClass ?? "text-gray-900 dark:text-white"}`}
        >
          {value}
        </p>
        {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </TranslateTree>
  );
}

interface AllocationPreviewPanelProps {
  preview: AllocationPreview | null;
  loading?: boolean;
}

export default function AllocationPreviewPanel({
  preview,
  loading,
}: AllocationPreviewPanelProps) {
  if (loading) {
    return (
      <TranslateTree>
        <div className="mt-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 p-4 text-sm text-gray-500">
          Calculating allocation metrics…
        </div>
      </TranslateTree>
    );
  }

  if (!preview) return null;

  const returnColor =
    preview.strategyDailyReturnPct >= 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <TranslateTree>
      <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50/80 dark:bg-gray-900/40">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#00a76f] font-semibold">
              Allocation preview
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {preview.programName}
              {preview.strategyKey && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  · {preview.strategyKey}
                </span>
              )}
            </p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              preview.canAllocate
                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
            }`}
          >
            {preview.canAllocate ? "Ready to allocate" : "Cannot allocate"}
          </span>
        </div>

        {preview.warnings.length > 0 && (
          <ul className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-xs text-amber-800 dark:text-amber-200 border-b border-amber-100 dark:border-amber-900/40">
            {preview.warnings.map((w) => (
              <li key={w}>• {w}</li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-white dark:bg-gray-800/60">
          <Metric
            label="Invest amount"
            value={formatUsd(preview.amount, preview.currency)}
          />
          <Metric
            label="Available balance"
            value={formatUsd(preview.availableBalance, preview.currency)}
            sub={`After: ${formatUsd(preview.balanceAfterAllocation, preview.currency)}`}
            valueClass={
              !preview.sufficientFunds
                ? "text-red-600 dark:text-red-400"
                : undefined
            }
          />
          <Metric
            label="Portfolio value"
            value={formatUsd(preview.totalPortfolioValue, preview.currency)}
            sub={`Invested: ${formatUsd(preview.totalInvested, preview.currency)}`}
          />
          <Metric
            label="Portfolio allocation"
            value={formatPct(preview.allocationPctOfPortfolio)}
            sub="Of total portfolio"
          />
          <Metric
            label="Strategy exposure"
            value={formatPct(preview.strategyExposureAfterPct)}
            sub="In this strategy after"
          />
          <Metric label="Risk level" value={formatRisk(preview.riskLevel)} />
          <Metric
            label="Risk leverage"
            value={`${preview.riskLeverage}x`}
            sub={`Exposure ${formatUsd(preview.effectiveExposure, preview.currency)}`}
          />
          <Metric
            label="Max risk budget"
            value={formatUsd(preview.maxRiskBudgetUsd, preview.currency)}
            sub={`${preview.maxRiskBudgetPct}% daily cap`}
          />
          <Metric
            label="Lock-in"
            value={`${preview.lockInMonths} mo`}
            sub={new Date(preview.lockInEndsAt).toLocaleDateString()}
          />
          <Metric
            label="Client risk profile"
            value={formatRisk(preview.clientRiskTolerance)}
          />
          <Metric label="Plan tier" value={preview.planType} />
          <Metric
            label="Min investment"
            value={formatUsd(preview.minInvestment, preview.currency)}
          />
          <Metric
            label="Pool AUM"
            value={formatUsd(preview.poolAum, preview.currency)}
            sub={`Share ${formatPct(preview.poolSharePct)}`}
          />
          <Metric label="Strategy NAV" value={preview.navPerUnit.toFixed(4)} />
          <Metric
            label="Strategy daily"
            value={formatPct(preview.strategyDailyReturnPct)}
            valueClass={returnColor}
          />
          <Metric
            label="Strategy cumulative"
            value={formatPct(preview.strategyCumulativeReturnPct)}
            valueClass={returnColor}
          />
        </div>
      </div>
    </TranslateTree>
  );
}
