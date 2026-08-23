/**
 * @jest-environment node
 *
 * MSW's Node server (`msw/node`) intercepts requests at the Node.js
 * `http`/`https` module level. jsdom's `XMLHttpRequest` (this repo's
 * default `testEnvironment`) doesn't expose the Fetch API globals
 * (`Request`/`Response`) that `msw/node` needs, so this one file opts into
 * the plain Node test environment — which also means axios uses its
 * `http` adapter here instead of the `xhr` adapter, a closer match to how
 * requests actually flow through `msw/node` in production Node contexts.
 */
import { server } from "@/mocks/server";
import { api } from "./api-client";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api.ops", () => {
  it("getTradingStatus resolves with the mock status", async () => {
    const response = await api.ops.getTradingStatus();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: "running" });
  });

  it("setKillSwitch resolves with the active flag echoed back", async () => {
    const response = await api.ops.setKillSwitch({
      active: true,
      reason: "maintenance",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ active: true });
  });

  it("runNavBatch resolves with started:true", async () => {
    const response = await api.ops.runNavBatch();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ started: true });
  });

  it("getNavHistory resolves with an empty history fixture", async () => {
    const response = await api.ops.getNavHistory("strategy-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ history: [] });
  });

  it("getFlipbotStatus resolves with the mock status", async () => {
    const response = await api.ops.getFlipbotStatus();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: "ok" });
  });

  it("getExnessPartnerStatus resolves with connected:true", async () => {
    const response = await api.ops.getExnessPartnerStatus();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ connected: true });
  });

  it("getExnessPartnerSummary resolves with the mock equity fixture", async () => {
    const response = await api.ops.getExnessPartnerSummary();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ equity: 100000 });
  });

  it("getFlipbotPool resolves with the mock pool fixture", async () => {
    const response = await api.ops.getFlipbotPool("strategy-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ pool: 5 });
  });

  it("pushFlipbotSignal resolves with queued:true", async () => {
    const response = await api.ops.pushFlipbotSignal({
      symbol: "EURUSD",
      side: "buy",
      volumeLots: 1,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ queued: true });
  });

  it("getStrategyLifecycle resolves with an empty strategies fixture", async () => {
    const response = await api.ops.getStrategyLifecycle();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ strategies: [] });
  });

  it("runPromotionCheck resolves with ok:true", async () => {
    const response = await api.ops.runPromotionCheck("strategy-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ ok: true });
  });

  it("promoteStrategy resolves with promoted:true", async () => {
    const response = await api.ops.promoteStrategy("strategy-1", {
      targetStatus: "live",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ promoted: true });
  });

  it("syncPositions resolves with synced:true", async () => {
    const response = await api.ops.syncPositions();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ synced: true });
  });

  it("getSyncedPositions resolves with an empty positions fixture", async () => {
    const response = await api.ops.getSyncedPositions();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ positions: [] });
  });

  it("runDemoReconciliation resolves with reconciled:true", async () => {
    const response = await api.ops.runDemoReconciliation();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ reconciled: true });
  });

  it("getDemoReconciliationHistory resolves with an empty history fixture", async () => {
    const response = await api.ops.getDemoReconciliationHistory();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ history: [] });
  });
});
