import { renderHook, waitFor, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { useTradingOps } from "./useTradingOps";

describe("useTradingOps", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    mock.onGet("/admin/security/mfa/status").reply(200, { mfaEnabled: false });
    mock.onGet("/ops/flipbot/pool/momentum").reply(200, {
      strategyKey: "momentum",
      poolAum: 1000,
      executionModel: "pooled",
      bridgeEnabled: true,
    });
  });

  afterEach(() => {
    mock.restore();
  });

  function mockStatusEndpoints(overrides?: { killSwitchActive?: boolean }) {
    mock.onGet("/ops/trading/status").reply(200, {
      connected: true,
      quant: {
        kill_switch_active: overrides?.killSwitchActive ?? false,
        mode: "paper",
        strategies: [],
        positions: [],
        metrics: {},
        last_updated: new Date(0).toISOString(),
      },
      strategies: [],
    });
    mock.onGet("/ops/flipbot/status").reply(200, { connected: true });
    mock.onGet("/ops/strategies/lifecycle").reply(200, []);
    mock.onGet("/ops/trading/demo-reconciliation/history").reply(200, []);
    mock.onGet("/ops/partner/exness/summary").reply(200, null);
  }

  it("loads trading status on mount", async () => {
    mockStatusEndpoints();

    const { result } = renderHook(() => useTradingOps());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status?.connected).toBe(true);
    expect(result.current.killActive).toBe(false);
  });

  it("clears status and shows an error toast when the initial load fails", async () => {
    mock.onGet("/ops/trading/status").reply(500);
    mock.onGet("/ops/flipbot/status").reply(200, { connected: false });
    mock.onGet("/ops/strategies/lifecycle").reply(200, []);
    mock.onGet("/ops/trading/demo-reconciliation/history").reply(200, []);
    mock.onGet("/ops/partner/exness/summary").reply(200, null);

    const { result } = renderHook(() => useTradingOps());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.status).toBeNull();
  });

  it("activates the kill switch and reloads status", async () => {
    mockStatusEndpoints();
    mock.onPost("/ops/trading/kill-switch").reply(200, {});

    const originalPrompt = window.prompt;
    window.prompt = jest.fn().mockReturnValue("maintenance window");

    const { result } = renderHook(() => useTradingOps());
    await waitFor(() => expect(result.current.loading).toBe(false));

    mockStatusEndpoints({ killSwitchActive: true });

    await act(async () => {
      await result.current.handleKillSwitch(true);
    });

    expect(result.current.killActive).toBe(true);
    expect(
      mock.history.post?.find((r) => r.url === "/ops/trading/kill-switch")
        ?.data,
    ).toBe(JSON.stringify({ active: true, reason: "maintenance window" }));

    window.prompt = originalPrompt;
  });
});
