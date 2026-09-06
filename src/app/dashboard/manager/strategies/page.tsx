"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowPathIcon,
  ChartBarSquareIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { useInvestor } from "@/hooks/useInvestor";
import { logger } from "@/lib/logger";

type StrategyRow = {
  strategyKey: string;
  displayName: string;
  lifecycleStatus: string | null;
  isActive: boolean;
  isPrimary: boolean;
  isRunning: boolean;
  executionPlane: "quant" | "flipbot" | "both";
  capitalAllocation: number;
  poolAum: number;
  investorCount: number;
  navPerUnit: number;
  dailyReturnPct: number;
  cumulativeReturnPct: number;
  walkForwardScore: number | null;
  productName: string | null;
};

type CombinedMetrics = {
  totalPoolAum: number;
  totalInvestors: number;
  strategyCount: number;
  activeCount: number;
  primaryStrategy: string | null;
  weightedDailyReturnPct: number;
  weightedCumulativeReturnPct: number;
  blendedNavPerUnit: number;
  quantConnected: boolean;
  flipbotConnected: boolean;
  killSwitchActive: boolean;
  tradingMode: string | null;
};

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPct(n: number, digits = 2) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}

function StatusBadge({
  running,
  active,
  primary,
}: {
  running: boolean;
  active: boolean;
  primary: boolean;
}) {
  if (running) {
    return (
      <TranslateTree>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Running
        </span>
      </TranslateTree>
    );
  }
  if (primary) {
    return (
      <TranslateTree>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
          Primary
        </span>
      </TranslateTree>
    );
  }
  if (active) {
    return (
      <TranslateTree>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          Active
        </span>
      </TranslateTree>
    );
  }
  return (
    <TranslateTree>
      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        Stopped
      </span>
    </TranslateTree>
  );
}

export default function ManagerStrategiesPage() {
  const router = useRouter();
  const { isAdmin, isManager, loading: authLoading } = useInvestor();
  const [strategies, setStrategies] = useState<StrategyRow[]>([]);
  const [combined, setCombined] = useState<CombinedMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionKey, setActionKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.portfolioManager.getStrategies();
      setStrategies(data.strategies);
      setCombined(data.combined);
    } catch (error) {
      logger.error("Failed to load strategies", error);
      toast.error("Failed to load strategies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isAdmin && !isManager) {
      router.replace("/dashboard");
      return;
    }
    if (!authLoading) void load();
  }, [authLoading, isAdmin, isManager, router, load]);

  const handleSwitch = async (strategyKey: string) => {
    setActionKey(strategyKey);
    try {
      const { data } = await api.portfolioManager.switchStrategy(strategyKey);
      setStrategies(data.strategies);
      setCombined(data.combined);
      toast.success(`${strategyKey} is now the running strategy`);
    } catch (error) {
      logger.error("Failed to switch strategy", error);
      toast.error("Failed to switch strategy");
    } finally {
      setActionKey(null);
    }
  };

  const handleToggleActive = async (strategyKey: string, active: boolean) => {
    setActionKey(strategyKey);
    try {
      const { data } = await api.portfolioManager.setStrategyActive(
        strategyKey,
        active,
      );
      setStrategies(data.strategies);
      setCombined(data.combined);
      toast.success(active ? "Strategy activated" : "Strategy deactivated");
    } catch (error) {
      logger.error("Failed to update strategy", error);
      toast.error("Failed to update strategy");
    } finally {
      setActionKey(null);
    }
  };

  if (authLoading) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  return (
    <TranslateTree>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ChartBarSquareIcon className="w-8 h-8 text-[#00a76f]" />
              Strategy Portfolio
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              View running strategies, switch execution, and monitor pooled
              metrics
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {combined && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Combined Portfolio Metrics
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                AUM-weighted across {combined.strategyCount} strategies
                {combined.primaryStrategy && (
                  <>
                    {" "}
                    · Running: <strong>{combined.primaryStrategy}</strong>
                  </>
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700">
              {[
                { label: "Total AUM", value: formatUsd(combined.totalPoolAum) },
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
                    combined.flipbotConnected
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {combined.flipbotConnected ? "Connected" : "Offline"}
                </span>
              </span>
              <span>Mode: {combined.tradingMode ?? "—"}</span>
              {combined.killSwitchActive && (
                <span className="text-red-600 font-medium">
                  Kill switch active
                </span>
              )}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Strategies
            </h2>
          </div>

          {loading ? (
            <p className="p-5 text-sm text-gray-500">Loading strategies…</p>
          ) : strategies.length === 0 ? (
            <p className="p-5 text-sm text-gray-500">
              No strategies configured
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                    <th className="px-4 py-3 font-medium">Strategy</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Plane</th>
                    <th className="px-4 py-3 font-medium">Pool AUM</th>
                    <th className="px-4 py-3 font-medium">NAV</th>
                    <th className="px-4 py-3 font-medium">Daily</th>
                    <th className="px-4 py-3 font-medium">Cumulative</th>
                    <th className="px-4 py-3 font-medium">Alloc %</th>
                    <th className="px-4 py-3 font-medium">Lifecycle</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {strategies.map((s) => (
                    <tr
                      key={s.strategyKey}
                      className={`border-b dark:border-gray-700/50 ${
                        s.isRunning ? "bg-green-50/50 dark:bg-green-900/10" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {s.displayName}
                        </p>
                        <p className="text-xs text-gray-500">{s.strategyKey}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          running={s.isRunning}
                          active={s.isActive}
                          primary={s.isPrimary}
                        />
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-600 dark:text-gray-400">
                        {s.executionPlane}
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {formatUsd(s.poolAum)}
                        <span className="text-xs text-gray-500 block">
                          {s.investorCount} investor
                          {s.investorCount !== 1 ? "s" : ""}
                        </span>
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {s.navPerUnit.toFixed(4)}
                      </td>
                      <td
                        className={`px-4 py-3 tabular-nums ${
                          s.dailyReturnPct >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatPct(s.dailyReturnPct)}
                      </td>
                      <td
                        className={`px-4 py-3 tabular-nums ${
                          s.cumulativeReturnPct >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatPct(s.cumulativeReturnPct)}
                      </td>
                      <td className="px-4 py-3 tabular-nums">
                        {(s.capitalAllocation * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {s.lifecycleStatus ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {!s.isPrimary && (
                            <button
                              disabled={actionKey === s.strategyKey}
                              onClick={() => handleSwitch(s.strategyKey)}
                              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 bg-[#00a76f] text-white rounded-lg disabled:opacity-50"
                              title="Set as primary running strategy"
                            >
                              <PlayIcon className="w-3.5 h-3.5" />
                              Run
                            </button>
                          )}
                          {s.executionPlane !== "flipbot" && (
                            <button
                              disabled={actionKey === s.strategyKey}
                              onClick={() =>
                                handleToggleActive(s.strategyKey, !s.isActive)
                              }
                              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50"
                            >
                              {s.isActive ? (
                                <>
                                  <StopIcon className="w-3.5 h-3.5" />
                                  Stop
                                </>
                              ) : (
                                <>
                                  <PlayIcon className="w-3.5 h-3.5" />
                                  Enable
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </TranslateTree>
  );
}
