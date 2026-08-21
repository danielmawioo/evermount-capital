import { render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import TradingOpsPage from "./page";

describe("TradingOpsPage", () => {
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
    mock.onGet("/ops/trading/status").reply(200, {
      connected: true,
      quant: {
        kill_switch_active: false,
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
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the trading ops page after loading", async () => {
    render(<TradingOpsPage />);

    expect(
      screen.getByRole("heading", { name: /Trading Ops/i })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByText("Connected").length).toBeGreaterThan(0)
    );

    expect(screen.getByText("Kill Switch")).toBeInTheDocument();
    expect(
      screen.getByText(/Inactive — trading allowed/i)
    ).toBeInTheDocument();
  });
});
