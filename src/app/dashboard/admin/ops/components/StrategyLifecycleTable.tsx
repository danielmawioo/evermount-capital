"use client";

import TranslateTree from "@/app/components/TranslateTree";

import type { LifecycleRow, TradingStatus } from "@/hooks/useTradingOps";

export interface StrategyLifecycleTableProps {
  lifecycle: LifecycleRow[];
  strategies: NonNullable<TradingStatus["quant"]>["strategies"] | undefined;
  actionLoading: boolean;
  onPromotionCheck: (strategyKey: string) => void;
  onPromote: (strategyKey: string, targetStatus: string) => void;
}

export default function StrategyLifecycleTable({
  lifecycle,
  strategies,
  actionLoading,
  onPromotionCheck,
  onPromote,
}: StrategyLifecycleTableProps) {
  return (
    <TranslateTree>
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
        Strategy lifecycle
      </h2>
      {lifecycle.length === 0 && strategies?.length ? (
        <div className="space-y-2">
          {strategies.map((s) => (
            <div
              key={s.name}
              className="flex flex-wrap items-center justify-between gap-2 py-2 border-b dark:border-gray-700/50"
            >
              <span className="font-medium">{s.name}</span>
              <div className="flex gap-2">
                <button
                  disabled={actionLoading}
                  onClick={() => onPromotionCheck(s.name)}
                  className="text-xs px-3 py-1 border rounded-lg"
                >
                  Walk-forward check
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => onPromote(s.name, "PAPER")}
                  className="text-xs px-3 py-1 bg-[#00a76f] text-white rounded-lg"
                >
                  Promote to PAPER
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : lifecycle.length === 0 ? (
        <p className="text-sm text-gray-500">No lifecycle records</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b dark:border-gray-700">
              <th className="pb-2">Strategy</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">WF score</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lifecycle.map((row) => (
              <tr key={row.id} className="border-b dark:border-gray-700/50">
                <td className="py-2 font-medium">{row.strategyKey}</td>
                <td className="py-2">{row.status}</td>
                <td className="py-2">
                  {row.walkForwardScore != null
                    ? Number(row.walkForwardScore).toFixed(2)
                    : "—"}
                </td>
                <td className="py-2 flex gap-2">
                  <button
                    disabled={actionLoading}
                    onClick={() => onPromotionCheck(row.strategyKey)}
                    className="text-xs px-2 py-1 border rounded"
                  >
                    Check
                  </button>
                  {row.status !== "PAPER" && row.status !== "PRODUCTION" && (
                    <button
                      disabled={actionLoading}
                      onClick={() => onPromote(row.strategyKey, "PAPER")}
                      className="text-xs px-2 py-1 bg-[#00a76f] text-white rounded"
                    >
                      → PAPER
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
      </TranslateTree>
  );
}
