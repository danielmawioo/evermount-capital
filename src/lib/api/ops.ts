import { apiClient } from "./client";

function mfaConfig(mfaToken?: string) {
  return mfaToken ? { headers: { "X-MFA-Token": mfaToken } } : undefined;
}

export const ops = {
  getTradingStatus: () => apiClient.get("/ops/trading/status"),

  setKillSwitch: (
    data: { active: boolean; reason?: string },
    mfaToken?: string,
  ) => apiClient.post("/ops/trading/kill-switch", data, mfaConfig(mfaToken)),

  runNavBatch: () => apiClient.post("/ops/nav-batch/run"),

  getNavHistory: (strategyKey: string) =>
    apiClient.get(`/ops/nav/${strategyKey}/history`),

  getFlipbotStatus: () => apiClient.get("/ops/flipbot/status"),

  getExnessPartnerStatus: () => apiClient.get("/ops/partner/exness/status"),

  getExnessPartnerSummary: () => apiClient.get("/ops/partner/exness/summary"),

  getFlipbotPool: (strategyKey: string) =>
    apiClient.get(`/ops/flipbot/pool/${strategyKey}`),

  pushFlipbotSignal: (data: {
    symbol?: string;
    side?: "buy" | "sell";
    volumeLots?: number;
    slPips?: number;
    tpPips?: number;
    strategyKey?: string;
  }) => apiClient.post("/ops/flipbot/signals", data),

  getStrategyLifecycle: () => apiClient.get("/ops/strategies/lifecycle"),

  runPromotionCheck: (strategyKey: string, mfaToken?: string) =>
    apiClient.post(
      `/ops/strategies/${strategyKey}/promotion-check`,
      {},
      mfaConfig(mfaToken),
    ),

  promoteStrategy: (
    strategyKey: string,
    data: { targetStatus: string },
    mfaToken?: string,
  ) =>
    apiClient.post(
      `/ops/strategies/${strategyKey}/promote`,
      data,
      mfaConfig(mfaToken),
    ),

  syncPositions: () => apiClient.post("/ops/trading/sync-positions"),

  getSyncedPositions: () => apiClient.get("/ops/trading/positions"),

  runDemoReconciliation: (mfaToken?: string) =>
    apiClient.post("/ops/trading/demo-reconciliation", {}, mfaConfig(mfaToken)),

  getDemoReconciliationHistory: () =>
    apiClient.get("/ops/trading/demo-reconciliation/history"),
};
