"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BoltIcon,
  ShieldExclamationIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";

async function promptMfaToken(): Promise<string | undefined> {
  try {
    const { data } = await api.security.mfa.getStatus();
    if (!data.mfaEnabled) return undefined;
  } catch {
    return undefined;
  }
  const code = prompt("Enter 6-digit MFA code:");
  return code?.trim() || undefined;
}

interface TradingStatus {
  connected: boolean;
  quant: {
    kill_switch_active: boolean;
    kill_switch_reason?: string;
    mode: string;
    strategies: Array<{ name: string; active: boolean; capital_allocation: number }>;
    positions: Array<Record<string, unknown>>;
    metrics: Record<string, unknown>;
    last_updated: string;
  } | null;
  strategies: Array<{ name: string; active: boolean }>;
}

interface FlipbotStatus {
  connected: boolean;
  health?: { status: string; version?: string };
  tradingStyle?: { trading_style?: string };
  risk?: Record<string, unknown>;
}

interface LifecycleRow {
  id: string;
  strategyKey: string;
  status: string;
  walkForwardScore?: number;
}

export default function TradingOpsPage() {
  const [status, setStatus] = useState<TradingStatus | null>(null);
  const [flipbot, setFlipbot] = useState<FlipbotStatus | null>(null);
  const [lifecycle, setLifecycle] = useState<LifecycleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [reconHistory, setReconHistory] = useState<
    Array<{ id: string; status: string; navDriftCount: number; createdAt: string }>
  >([]);

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const [tradingRes, flipbotRes, lifecycleRes, reconRes] = await Promise.all([
        api.ops.getTradingStatus(),
        api.ops.getFlipbotStatus().catch(() => ({ data: null })),
        api.ops.getStrategyLifecycle().catch(() => ({ data: [] })),
        api.ops.getDemoReconciliationHistory().catch(() => ({ data: [] })),
      ]);
      setStatus(tradingRes.data);
      setFlipbot(flipbotRes.data);
      setLifecycle(lifecycleRes.data);
      setReconHistory(reconRes.data);
    } catch {
      toast.error("Failed to load trading ops status");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  const handleKillSwitch = async (active: boolean) => {
    const reason = active
      ? prompt("Kill switch reason (optional):") || undefined
      : undefined;
    setActionLoading(true);
    try {
      const mfaToken = await promptMfaToken();
      await api.ops.setKillSwitch({ active, reason }, mfaToken);
      toast.success(active ? "Kill switch activated" : "Kill switch deactivated");
      await loadStatus();
    } catch {
      toast.error("Failed to update kill switch");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePromotionCheck = async (strategyKey: string) => {
    setActionLoading(true);
    try {
      const mfaToken = await promptMfaToken();
      const { data } = await api.ops.runPromotionCheck(strategyKey, mfaToken);
      toast.success(
        data.passed
          ? `${strategyKey}: promotion check passed`
          : `${strategyKey}: promotion check failed`
      );
      const { data: rows } = await api.ops.getStrategyLifecycle();
      setLifecycle(rows);
    } catch {
      toast.error("Promotion check failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePromote = async (strategyKey: string, targetStatus: string) => {
    setActionLoading(true);
    try {
      const mfaToken = await promptMfaToken();
      await api.ops.promoteStrategy(strategyKey, { targetStatus }, mfaToken);
      toast.success(`${strategyKey} → ${targetStatus}`);
      const { data: rows } = await api.ops.getStrategyLifecycle();
      setLifecycle(rows);
    } catch {
      toast.error("Promotion failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSyncPositions = async () => {
    setActionLoading(true);
    try {
      const { data } = await api.ops.syncPositions();
      toast.success(`Synced ${data.synced} position snapshot(s)`);
      await loadStatus();
    } catch {
      toast.error("Position sync failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDemoReconciliation = async () => {
    setActionLoading(true);
    try {
      const mfaToken = await promptMfaToken();
      const { data } = await api.ops.runDemoReconciliation(mfaToken);
      toast.success(
        `Reconciliation ${data.status} — ${data.navDriftCount} NAV drift(s)`
      );
      await loadStatus();
    } catch {
      toast.error("Demo reconciliation failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleNavBatch = async () => {
    setActionLoading(true);
    try {
      const { data } = await api.ops.runNavBatch();
      toast.success(`NAV batch complete — ${data.updated} strategies updated`);
      await loadStatus();
    } catch {
      toast.error("NAV batch failed — is quant API running?");
    } finally {
      setActionLoading(false);
    }
  };

  const quant = status?.quant;
  const killActive = quant?.kill_switch_active ?? false;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BoltIcon className="w-8 h-8 text-[#00a76f]" />
            Trading Ops
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor quant engine, kill switch, and NAV publishing
          </p>
        </div>
        <button
          onClick={loadStatus}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <ArrowPathIcon className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
            Quant Connection
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Status:{" "}
            <span
              className={
                status?.connected ? "text-green-600 font-medium" : "text-red-600"
              }
            >
              {status?.connected ? "Connected" : "Disconnected"}
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
                onClick={() => handleKillSwitch(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg disabled:opacity-50"
              >
                Activate Kill Switch
              </button>
            ) : (
              <button
                disabled={actionLoading}
                onClick={() => handleKillSwitch(false)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg disabled:opacity-50"
              >
                Deactivate
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            NAV Publishing
          </h2>
          <button
            disabled={actionLoading}
            onClick={handleNavBatch}
            className="px-4 py-2 bg-[#00a76f] hover:bg-emerald-700 text-white text-sm rounded-lg disabled:opacity-50"
          >
            Run NAV Batch
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Pulls strategy NAV from evermount-quant and updates investor portfolio
          values.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Strategies
        </h2>
        {!quant?.strategies?.length ? (
          <p className="text-sm text-gray-500">No strategies reported</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b dark:border-gray-700">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Active</th>
                  <th className="pb-2">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {quant.strategies.map((s) => (
                  <tr key={s.name} className="border-b dark:border-gray-700/50">
                    <td className="py-2 font-medium text-gray-900 dark:text-white">
                      {s.name}
                    </td>
                    <td className="py-2">{s.active ? "Yes" : "No"}</td>
                    <td className="py-2">
                      {(s.capital_allocation * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
          Open Positions
        </h2>
        <p className="text-sm text-gray-500">
          {quant?.positions?.length
            ? `${quant.positions.length} position(s)`
            : "No open positions reported (paper trading)"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3">
          Flipbot (orderflow / MT5)
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Status:{" "}
          <span
            className={
              flipbot?.connected ? "text-green-600 font-medium" : "text-red-600"
            }
          >
            {flipbot?.connected ? "Connected" : "Disconnected"}
          </span>
        </p>
        {flipbot?.health && (
          <p className="text-sm text-gray-500 mt-1">
            v{flipbot.health.version ?? "?"} — {flipbot.health.status}
          </p>
        )}
        {flipbot?.tradingStyle?.trading_style && (
          <p className="text-sm text-gray-500 mt-1">
            Style: {flipbot.tradingStyle.trading_style}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Demo reconciliation (30d)
          </h2>
          <div className="flex gap-2">
            <button
              disabled={actionLoading}
              onClick={handleSyncPositions}
              className="text-xs px-3 py-1.5 border rounded-lg"
            >
              Sync positions
            </button>
            <button
              disabled={actionLoading}
              onClick={handleDemoReconciliation}
              className="text-xs px-3 py-1.5 bg-[#00a76f] text-white rounded-lg"
            >
              Run reconciliation
            </button>
          </div>
        </div>
        {reconHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No reconciliation runs yet</p>
        ) : (
          <ul className="text-sm space-y-2">
            {reconHistory.slice(0, 5).map((r) => (
              <li key={r.id} className="flex justify-between gap-4">
                <span>
                  <span className="font-medium">{r.status}</span> — {r.navDriftCount}{" "}
                  drift(s)
                </span>
                <span className="text-gray-500">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Strategy lifecycle
        </h2>
        {lifecycle.length === 0 && quant?.strategies?.length ? (
          <div className="space-y-2">
            {quant.strategies.map((s) => (
              <div
                key={s.name}
                className="flex flex-wrap items-center justify-between gap-2 py-2 border-b dark:border-gray-700/50"
              >
                <span className="font-medium">{s.name}</span>
                <div className="flex gap-2">
                  <button
                    disabled={actionLoading}
                    onClick={() => handlePromotionCheck(s.name)}
                    className="text-xs px-3 py-1 border rounded-lg"
                  >
                    Walk-forward check
                  </button>
                  <button
                    disabled={actionLoading}
                    onClick={() => handlePromote(s.name, "PAPER")}
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
                      onClick={() => handlePromotionCheck(row.strategyKey)}
                      className="text-xs px-2 py-1 border rounded"
                    >
                      Check
                    </button>
                    {row.status !== "PAPER" && row.status !== "PRODUCTION" && (
                      <button
                        disabled={actionLoading}
                        onClick={() => handlePromote(row.strategyKey, "PAPER")}
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
    </div>
  );
}
