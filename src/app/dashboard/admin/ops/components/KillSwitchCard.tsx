"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import type { TradingStatus } from "@/hooks/useTradingOps";

export interface KillSwitchCardProps {
  killActive: boolean;
  quant: TradingStatus["quant"] | undefined;
  actionLoading: boolean;
  onToggle: (active: boolean) => void;
}

export default function KillSwitchCard({
  killActive,
  quant,
  actionLoading,
  onToggle,
}: KillSwitchCardProps) {
  return (
    <TranslateTree>
    <div
      className={`rounded-xl border p-5 ${
        killActive
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
        <ShieldExclamationIcon className="w-5 h-5" />
        Kill Switch
      </h2>
      <p className="text-sm mb-4">
        {killActive ? (
          <span className="text-red-700 dark:text-red-300 font-medium">
            ACTIVE — {quant?.kill_switch_reason || "No reason provided"}
          </span>
        ) : (
          <span className="text-green-700 dark:text-green-300">
            Inactive — trading allowed
          </span>
        )}
      </p>
      <div className="flex gap-2">
        {!killActive ? (
          <button
            disabled={actionLoading}
            onClick={() => onToggle(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg disabled:opacity-50"
          >
            Activate Kill Switch
          </button>
        ) : (
          <button
            disabled={actionLoading}
            onClick={() => onToggle(false)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg disabled:opacity-50"
          >
            Deactivate
          </button>
        )}
      </div>
    </div>
      </TranslateTree>
  );
}
