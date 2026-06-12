"use client";

import Link from "next/link";

export interface TradePreview {
  investmentOptionId: string;
  programName: string;
  strategyKey: string | null;
  riskLevel: string;
  lockInMonths: number;
  lockInEndsAt: string;
  amount: number;
  allocationReason: string;
  planType: string;
  minInvestment: number;
}

interface TradePreviewCardProps {
  preview: TradePreview;
  tierLabel: string;
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatRisk(risk: string) {
  return risk.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export default function TradePreviewCard({
  preview,
  tierLabel,
}: TradePreviewCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161a23] overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-[#00a76f]/5">
        <p className="text-xs uppercase tracking-wide text-[#00a76f] font-semibold">
          Your recommended match
        </p>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
          {preview.programName}
        </h3>
      </div>

      <dl className="divide-y divide-gray-100 dark:divide-gray-800">
        <div className="flex justify-between px-5 py-3 text-sm">
          <dt className="text-gray-500 dark:text-gray-400">Amount</dt>
          <dd className="font-semibold text-gray-900 dark:text-white tabular-nums">
            {formatUsd(preview.amount)}
          </dd>
        </div>
        <div className="flex justify-between px-5 py-3 text-sm">
          <dt className="text-gray-500 dark:text-gray-400">Lock-in ends</dt>
          <dd className="font-semibold text-gray-900 dark:text-white">
            {formatDate(preview.lockInEndsAt)}
          </dd>
        </div>
        <div className="flex justify-between px-5 py-3 text-sm">
          <dt className="text-gray-500 dark:text-gray-400">Lock-in period</dt>
          <dd className="font-semibold text-gray-900 dark:text-white">
            {preview.lockInMonths} months
          </dd>
        </div>
        <div className="flex justify-between px-5 py-3 text-sm">
          <dt className="text-gray-500 dark:text-gray-400">Risk level</dt>
          <dd className="font-semibold text-gray-900 dark:text-white">
            {formatRisk(preview.riskLevel)}
          </dd>
        </div>
        <div className="flex justify-between px-5 py-3 text-sm">
          <dt className="text-gray-500 dark:text-gray-400">Your plan</dt>
          <dd className="font-semibold text-gray-900 dark:text-white">
            {tierLabel}
          </dd>
        </div>
      </dl>

      <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/40">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-800 dark:text-white">Why this match: </span>
          {preview.allocationReason}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Management and performance fees apply per your {tierLabel} plan. See pricing for details.
        </p>
        <Link
          href="/dashboard/setting"
          className="inline-block mt-3 text-sm text-[#00a76f] hover:underline font-medium"
        >
          Adjust investment preferences
        </Link>
      </div>
    </div>
  );
}
