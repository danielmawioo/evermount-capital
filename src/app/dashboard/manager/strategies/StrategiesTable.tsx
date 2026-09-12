"use client";

import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { formatCurrency, formatPct } from "@/lib/format";
import type { StrategyRow } from "@/hooks/useManagerStrategies";
import StrategyStatusBadge from "./StrategyStatusBadge";

type Props = {
  strategies: StrategyRow[];
  loading: boolean;
  actionKey: string | null;
  onSwitch: (strategyKey: string) => void;
  onToggleActive: (strategyKey: string, active: boolean) => void;
};

export default function StrategiesTable({
  strategies,
  loading,
  actionKey,
  onSwitch,
  onToggleActive,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Strategies
        </h2>
      </div>

      {loading ? (
        <p className="p-5 text-sm text-gray-500">Loading strategies…</p>
      ) : strategies.length === 0 ? (
        <p className="p-5 text-sm text-gray-500">No strategies configured</p>
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
                    <StrategyStatusBadge
                      running={s.isRunning}
                      active={s.isActive}
                      primary={s.isPrimary}
                    />
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-600 dark:text-gray-400">
                    {s.executionPlane}
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    {formatCurrency(s.poolAum, "USD", {
                      maximumFractionDigits: 0,
                    })}
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
                      s.dailyReturnPct >= 0 ? "text-green-600" : "text-red-600"
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
                      {!s.isPrimary ? (
                        <button
                          disabled={actionKey === s.strategyKey}
                          onClick={() => onSwitch(s.strategyKey)}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 bg-[#00a76f] text-white rounded-lg disabled:opacity-50"
                          title="Set as primary running strategy"
                        >
                          <PlayIcon className="w-3.5 h-3.5" />
                          Run
                        </button>
                      ) : null}
                      {s.executionPlane !== "flipbot" ? (
                        <button
                          disabled={actionKey === s.strategyKey}
                          onClick={() =>
                            onToggleActive(s.strategyKey, !s.isActive)
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
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
