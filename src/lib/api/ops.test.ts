import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { ops } from "./ops";

describe("ops api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getTradingStatus gets /ops/trading/status", async () => {
    mock.onGet("/ops/trading/status").reply(200, { status: "running" });
    const res = await ops.getTradingStatus();
    expect(res.data).toEqual({ status: "running" });
    expect(mock.history.get[0].url).toBe("/ops/trading/status");
  });

  it("setKillSwitch posts data without MFA header when no token given", async () => {
    mock.onPost("/ops/trading/kill-switch").reply(200, { active: true });
    const res = await ops.setKillSwitch({ active: true, reason: "test" });
    expect(res.data).toEqual({ active: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/ops/trading/kill-switch");
    expect(JSON.parse(req.data)).toEqual({ active: true, reason: "test" });
    expect(req.headers?.["X-MFA-Token"]).toBeUndefined();
  });

  it("setKillSwitch posts data with MFA header when token given", async () => {
    mock.onPost("/ops/trading/kill-switch").reply(200, { active: false });
    const res = await ops.setKillSwitch({ active: false }, "mfa-123");
    expect(res.data).toEqual({ active: false });
    const req = mock.history.post[0];
    expect(JSON.parse(req.data)).toEqual({ active: false });
    expect(req.headers?.["X-MFA-Token"]).toBe("mfa-123");
  });

  it("runNavBatch posts to /ops/nav-batch/run", async () => {
    mock.onPost("/ops/nav-batch/run").reply(200, { started: true });
    const res = await ops.runNavBatch();
    expect(res.data).toEqual({ started: true });
    expect(mock.history.post[0].url).toBe("/ops/nav-batch/run");
  });

  it("getNavHistory gets /ops/nav/:strategyKey/history", async () => {
    mock.onGet("/ops/nav/alpha/history").reply(200, { history: [] });
    const res = await ops.getNavHistory("alpha");
    expect(res.data).toEqual({ history: [] });
    expect(mock.history.get[0].url).toBe("/ops/nav/alpha/history");
  });

  it("getFlipbotStatus gets /ops/flipbot/status", async () => {
    mock.onGet("/ops/flipbot/status").reply(200, { status: "ok" });
    const res = await ops.getFlipbotStatus();
    expect(res.data).toEqual({ status: "ok" });
    expect(mock.history.get[0].url).toBe("/ops/flipbot/status");
  });

  it("getExnessPartnerStatus gets /ops/partner/exness/status", async () => {
    mock.onGet("/ops/partner/exness/status").reply(200, { connected: true });
    const res = await ops.getExnessPartnerStatus();
    expect(res.data).toEqual({ connected: true });
    expect(mock.history.get[0].url).toBe("/ops/partner/exness/status");
  });

  it("getExnessPartnerSummary gets /ops/partner/exness/summary", async () => {
    mock.onGet("/ops/partner/exness/summary").reply(200, { equity: 100 });
    const res = await ops.getExnessPartnerSummary();
    expect(res.data).toEqual({ equity: 100 });
    expect(mock.history.get[0].url).toBe("/ops/partner/exness/summary");
  });

  it("getFlipbotPool gets /ops/flipbot/pool/:strategyKey", async () => {
    mock.onGet("/ops/flipbot/pool/beta").reply(200, { pool: 5 });
    const res = await ops.getFlipbotPool("beta");
    expect(res.data).toEqual({ pool: 5 });
    expect(mock.history.get[0].url).toBe("/ops/flipbot/pool/beta");
  });

  it("pushFlipbotSignal posts signal data to /ops/flipbot/signals", async () => {
    mock.onPost("/ops/flipbot/signals").reply(200, { queued: true });
    const signal = {
      symbol: "EURUSD",
      side: "buy" as const,
      volumeLots: 1,
      slPips: 10,
      tpPips: 20,
      strategyKey: "alpha",
    };
    const res = await ops.pushFlipbotSignal(signal);
    expect(res.data).toEqual({ queued: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/ops/flipbot/signals");
    expect(JSON.parse(req.data)).toEqual(signal);
  });

  it("getStrategyLifecycle gets /ops/strategies/lifecycle", async () => {
    mock.onGet("/ops/strategies/lifecycle").reply(200, { strategies: [] });
    const res = await ops.getStrategyLifecycle();
    expect(res.data).toEqual({ strategies: [] });
    expect(mock.history.get[0].url).toBe("/ops/strategies/lifecycle");
  });

  it("runPromotionCheck posts empty body without MFA header when no token given", async () => {
    mock
      .onPost("/ops/strategies/alpha/promotion-check")
      .reply(200, { ok: true });
    const res = await ops.runPromotionCheck("alpha");
    expect(res.data).toEqual({ ok: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/ops/strategies/alpha/promotion-check");
    expect(JSON.parse(req.data)).toEqual({});
    expect(req.headers?.["X-MFA-Token"]).toBeUndefined();
  });

  it("runPromotionCheck posts with MFA header when token given", async () => {
    mock
      .onPost("/ops/strategies/alpha/promotion-check")
      .reply(200, { ok: true });
    const res = await ops.runPromotionCheck("alpha", "mfa-999");
    expect(res.data).toEqual({ ok: true });
    const req = mock.history.post[0];
    expect(req.headers?.["X-MFA-Token"]).toBe("mfa-999");
  });

  it("promoteStrategy posts target status without MFA header when no token given", async () => {
    mock.onPost("/ops/strategies/alpha/promote").reply(200, { promoted: true });
    const res = await ops.promoteStrategy("alpha", { targetStatus: "LIVE" });
    expect(res.data).toEqual({ promoted: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/ops/strategies/alpha/promote");
    expect(JSON.parse(req.data)).toEqual({ targetStatus: "LIVE" });
    expect(req.headers?.["X-MFA-Token"]).toBeUndefined();
  });

  it("promoteStrategy posts with MFA header when token given", async () => {
    mock.onPost("/ops/strategies/alpha/promote").reply(200, { promoted: true });
    const res = await ops.promoteStrategy(
      "alpha",
      { targetStatus: "LIVE" },
      "mfa-abc",
    );
    expect(res.data).toEqual({ promoted: true });
    const req = mock.history.post[0];
    expect(req.headers?.["X-MFA-Token"]).toBe("mfa-abc");
  });

  it("syncPositions posts to /ops/trading/sync-positions", async () => {
    mock.onPost("/ops/trading/sync-positions").reply(200, { synced: true });
    const res = await ops.syncPositions();
    expect(res.data).toEqual({ synced: true });
    expect(mock.history.post[0].url).toBe("/ops/trading/sync-positions");
  });

  it("getSyncedPositions gets /ops/trading/positions", async () => {
    mock.onGet("/ops/trading/positions").reply(200, { positions: [] });
    const res = await ops.getSyncedPositions();
    expect(res.data).toEqual({ positions: [] });
    expect(mock.history.get[0].url).toBe("/ops/trading/positions");
  });

  it("runDemoReconciliation posts empty body without MFA header when no token given", async () => {
    mock
      .onPost("/ops/trading/demo-reconciliation")
      .reply(200, { reconciled: true });
    const res = await ops.runDemoReconciliation();
    expect(res.data).toEqual({ reconciled: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/ops/trading/demo-reconciliation");
    expect(JSON.parse(req.data)).toEqual({});
    expect(req.headers?.["X-MFA-Token"]).toBeUndefined();
  });

  it("runDemoReconciliation posts with MFA header when token given", async () => {
    mock
      .onPost("/ops/trading/demo-reconciliation")
      .reply(200, { reconciled: true });
    const res = await ops.runDemoReconciliation("mfa-xyz");
    expect(res.data).toEqual({ reconciled: true });
    const req = mock.history.post[0];
    expect(req.headers?.["X-MFA-Token"]).toBe("mfa-xyz");
  });

  it("getDemoReconciliationHistory gets /ops/trading/demo-reconciliation/history", async () => {
    mock
      .onGet("/ops/trading/demo-reconciliation/history")
      .reply(200, { history: [] });
    const res = await ops.getDemoReconciliationHistory();
    expect(res.data).toEqual({ history: [] });
    expect(mock.history.get[0].url).toBe(
      "/ops/trading/demo-reconciliation/history",
    );
  });
});
