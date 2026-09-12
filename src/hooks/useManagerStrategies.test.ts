import { renderHook, waitFor, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { useManagerStrategies } from "./useManagerStrategies";

const STRATEGY = {
  strategyKey: "momentum",
  displayName: "Momentum Alpha",
  lifecycleStatus: "LIVE",
  isActive: true,
  isPrimary: false,
  isRunning: false,
  executionPlane: "quant" as const,
  capitalAllocation: 0.5,
  poolAum: 100000,
  investorCount: 4,
  navPerUnit: 1.05,
  dailyReturnPct: 1.2,
  cumulativeReturnPct: 8.4,
  walkForwardScore: 0.9,
  productName: "Momentum Fund",
};

const COMBINED = {
  totalPoolAum: 200000,
  totalInvestors: 10,
  strategyCount: 2,
  activeCount: 1,
  primaryStrategy: "other-key",
  weightedDailyReturnPct: 0.8,
  weightedCumulativeReturnPct: 5.5,
  blendedNavPerUnit: 1.03,
  quantConnected: true,
  flipbotConnected: false,
  killSwitchActive: false,
  tradingMode: "paper",
};

describe("useManagerStrategies", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads strategies and combined metrics", async () => {
    mock.onGet("/portfolio-manager/strategies").reply(200, {
      strategies: [STRATEGY],
      combined: COMBINED,
    });

    const { result } = renderHook(() => useManagerStrategies());
    await act(async () => {
      await result.current.load();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.strategies).toHaveLength(1);
    expect(result.current.combined?.totalPoolAum).toBe(200000);
  });
});
