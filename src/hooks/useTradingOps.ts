import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";

export async function promptMfaToken(): Promise<string | undefined> {
  try {
    const { data } = await api.security.mfa.getStatus();
    if (!data.mfaEnabled) return undefined;
  } catch {
    return undefined;
  }
  const code = prompt("Enter 6-digit MFA code:");
  return code?.trim() || undefined;
}

export interface TradingStatus {
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

export interface FlipbotStatus {
  connected: boolean;
  bridgeEnabled?: boolean;
  executionModel?: string;
  health?: { status: string; version?: string };
  tradingStyle?: { trading_style?: string };
  risk?: Record<string, unknown>;
}

export interface FlipbotPool {
  strategyKey: string;
  poolAum: number;
  executionModel: string;
  bridgeEnabled: boolean;
}

export interface ExnessPartnerStatus {
  enabled: boolean;
  connected: boolean;
  broker: string;
  baseUrl: string;
  referralLink?: string;
  referralLinkSource?: "configured" | "api";
  error?: string;
}

export interface ExnessPartnerSummary {
  status: ExnessPartnerStatus;
  summary: {
    connected: boolean;
    broker: string;
    referralLink?: string | null;
    referralLinkSource?: "configured" | "api" | null;
    defaultLink: {
      full_default_link?: string;
      url?: string;
      code?: string;
    } | null;
    wallet: {
      summary_equity?: number;
      reserved_rebates?: number;
    } | null;
    clients: { total: number };
    rewards: { totalCommissionUsd: number };
  } | null;
}

export const FLIPBOT_STRATEGY_KEYS = [
  "flipbot",
  "orderflow",
  "momentum",
  "mean_reversion",
  "volume_profile",
] as const;

export const STRATEGY_SYMBOLS: Record<string, string> = {
  flipbot: "EURUSD",
  orderflow: "EURUSD",
  momentum: "EURUSD",
  mean_reversion: "GBPUSD",
  volume_profile: "XAUUSD",
};

export interface LifecycleRow {
  id: string;
  strategyKey: string;
  status: string;
  walkForwardScore?: number;
}

export function useTradingOps() {
  const [status, setStatus] = useState<TradingStatus | null>(null);
  const [flipbot, setFlipbot] = useState<FlipbotStatus | null>(null);
  const [lifecycle, setLifecycle] = useState<LifecycleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [reconHistory, setReconHistory] = useState<
    Array<{ id: string; status: string; navDriftCount: number; createdAt: string }>
  >([]);
  const [flipbotPool, setFlipbotPool] = useState<FlipbotPool | null>(null);
  const [exnessPartner, setExnessPartner] = useState<ExnessPartnerSummary | null>(
    null,
  );
  const [signalForm, setSignalForm] = useState({
    strategyKey: "momentum",
    symbol: "EURUSD",
    side: "buy" as "buy" | "sell",
    volumeLots: 0.01,
    slPips: 20,
    tpPips: 40,
  });

  const loadStatus = useCallback(async () => {
    setLoading(true);
    try {
      const [tradingRes, flipbotRes, lifecycleRes, reconRes, exnessRes] =
        await Promise.all([
        api.ops.getTradingStatus(),
        api.ops.getFlipbotStatus().catch(() => ({ data: null })),
        api.ops.getStrategyLifecycle().catch(() => ({ data: [] })),
        api.ops.getDemoReconciliationHistory().catch(() => ({ data: [] })),
        api.ops.getExnessPartnerSummary().catch(() => ({ data: null })),
      ]);
      setStatus(tradingRes.data);
      setFlipbot(flipbotRes.data);
      setLifecycle(lifecycleRes.data);
      setReconHistory(reconRes.data);
      setExnessPartner(exnessRes.data);
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

  const loadFlipbotPool = useCallback(async (strategyKey: string) => {
    try {
      const { data } = await api.ops.getFlipbotPool(strategyKey);
      setFlipbotPool(data);
    } catch {
      setFlipbotPool(null);
    }
  }, []);

  useEffect(() => {
    if (signalForm.strategyKey) {
      void loadFlipbotPool(signalForm.strategyKey);
    }
  }, [signalForm.strategyKey, loadFlipbotPool]);

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

  const handlePushFlipbotSignal = async () => {
    setActionLoading(true);
    try {
      const { data } = await api.ops.pushFlipbotSignal(signalForm);
      if (data.queued) {
        toast.success(
          `Signal #${data.signal?.id} queued — ${signalForm.side.toUpperCase()} ${signalForm.volumeLots} lots ${signalForm.symbol}`
        );
        await loadFlipbotPool(signalForm.strategyKey);
      } else {
        toast.error(data.reason ?? "Signal not queued");
      }
    } catch {
      toast.error("Failed to queue Flipbot signal — is Flipbot API running?");
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

  return {
    status,
    flipbot,
    lifecycle,
    loading,
    actionLoading,
    reconHistory,
    flipbotPool,
    exnessPartner,
    signalForm,
    setSignalForm,
    quant,
    killActive,
    loadStatus,
    handleKillSwitch,
    handlePromotionCheck,
    handlePromote,
    handleSyncPositions,
    handleDemoReconciliation,
    handlePushFlipbotSignal,
    handleNavBatch,
  };
}
