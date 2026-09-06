"use client";

import TranslateTree from "@/app/components/TranslateTree";

import type { TradingStatus } from "@/hooks/useTradingOps";

export interface QuantConnectionCardProps {
  connected: boolean | undefined;
  quant: TradingStatus["quant"] | undefined;
}

export default function QuantConnectionCard({
  connected,
  quant,
}: QuantConnectionCardProps) {
  return (
    <TranslateTree>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
          Quant Connection
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Status:{" "}
          <span
            className={
              connected ? "text-green-600 font-medium" : "text-red-600"
            }
          >
            {connected ? "Connected" : "Disconnected"}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Mode: {quant?.mode ?? "—"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Last updated:{" "}
          {quant?.last_updated
            ? new Date(quant.last_updated).toLocaleString()
            : "—"}
        </p>
      </div>
    </TranslateTree>
  );
}
