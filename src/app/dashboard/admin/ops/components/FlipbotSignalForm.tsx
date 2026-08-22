"use client";

import type { Dispatch, SetStateAction } from "react";
import {
  FLIPBOT_STRATEGY_KEYS,
  STRATEGY_SYMBOLS,
  type FlipbotStatus,
  type FlipbotPool,
} from "@/hooks/useTradingOps";

export interface SignalFormState {
  strategyKey: string;
  symbol: string;
  side: "buy" | "sell";
  volumeLots: number;
  slPips: number;
  tpPips: number;
}

export interface FlipbotSignalFormProps {
  flipbot: FlipbotStatus | null;
  flipbotPool: FlipbotPool | null;
  signalForm: SignalFormState;
  setSignalForm: Dispatch<SetStateAction<SignalFormState>>;
  actionLoading: boolean;
  onSubmit: () => void;
}

export default function FlipbotSignalForm({
  flipbot,
  flipbotPool,
  signalForm,
  setSignalForm,
  actionLoading,
  onSubmit,
}: FlipbotSignalFormProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
        Flipbot — Pooled Exness MT5 Demo Execution
      </h2>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <p>
          API:{" "}
          <span
            className={
              flipbot?.connected ? "text-green-600 font-medium" : "text-red-600"
            }
          >
            {flipbot?.connected ? "Connected" : "Disconnected"}
          </span>
        </p>
        <p>
          Bridge:{" "}
          <span
            className={
              flipbot?.bridgeEnabled
                ? "text-green-600 font-medium"
                : "text-amber-600"
            }
          >
            {flipbot?.bridgeEnabled ? "Enabled" : "Disabled"}
          </span>
        </p>
        <p>
          Model:{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {flipbot?.executionModel ?? "pooled"}
          </span>
        </p>
      </div>
      {flipbot?.health && (
        <p className="text-sm text-gray-500 mb-1">
          v{flipbot.health.version ?? "?"} — {flipbot.health.status}
        </p>
      )}
      {flipbot?.tradingStyle?.trading_style && (
        <p className="text-sm text-gray-500 mb-4">
          Style: {flipbot.tradingStyle.trading_style}
        </p>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Queue demo trade (Exness MT5 account)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          FlipbotEA polls the signal queue and executes on the logged-in Exness MT5
          demo. Successful fills bump investor NAV via FillRecorded.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <label className="block text-xs text-gray-500">
            Strategy
            <select
              value={signalForm.strategyKey}
              onChange={(e) => {
                const key = e.target.value;
                setSignalForm((f) => ({
                  ...f,
                  strategyKey: key,
                  symbol: STRATEGY_SYMBOLS[key] ?? f.symbol,
                }));
              }}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            >
              {FLIPBOT_STRATEGY_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs text-gray-500">
            Symbol
            <input
              type="text"
              value={signalForm.symbol}
              onChange={(e) =>
                setSignalForm((f) => ({ ...f, symbol: e.target.value.toUpperCase() }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            />
          </label>

          <label className="block text-xs text-gray-500">
            Side
            <select
              value={signalForm.side}
              onChange={(e) =>
                setSignalForm((f) => ({
                  ...f,
                  side: e.target.value as "buy" | "sell",
                }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>

          <label className="block text-xs text-gray-500">
            Lots
            <input
              type="number"
              min={0.01}
              step={0.01}
              value={signalForm.volumeLots}
              onChange={(e) =>
                setSignalForm((f) => ({
                  ...f,
                  volumeLots: parseFloat(e.target.value) || 0.01,
                }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            />
          </label>

          <label className="block text-xs text-gray-500">
            SL (pips)
            <input
              type="number"
              min={1}
              value={signalForm.slPips}
              onChange={(e) =>
                setSignalForm((f) => ({
                  ...f,
                  slPips: parseInt(e.target.value, 10) || 20,
                }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            />
          </label>

          <label className="block text-xs text-gray-500">
            TP (pips)
            <input
              type="number"
              min={1}
              value={signalForm.tpPips}
              onChange={(e) =>
                setSignalForm((f) => ({
                  ...f,
                  tpPips: parseInt(e.target.value, 10) || 40,
                }))
              }
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
            />
          </label>
        </div>

        {flipbotPool && (
          <p className="text-xs text-gray-500 mb-3">
            Pooled AUM ({flipbotPool.strategyKey}):{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              ${flipbotPool.poolAum.toLocaleString()}
            </span>
          </p>
        )}

        <button
          disabled={actionLoading || !flipbot?.connected}
          onClick={onSubmit}
          className="px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white text-sm rounded-lg disabled:opacity-50"
        >
          Queue signal on MT5 demo
        </button>
      </div>
    </div>
  );
}
