import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import RiskMetricsPage from "./page";

const PERFORMANCE = {
  metrics: {
    maxDrawdown: -5.2,
    volatility: 2.7,
    sharpeRatio: 1.23,
  },
};

describe("RiskMetricsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the risk metrics overview with live data", async () => {
    mock.onGet("/portfolio/performance").reply(200, PERFORMANCE);

    render(<RiskMetricsPage />);

    expect(
      screen.getByRole("heading", { name: "Risk Metrics Overview" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Sharpe Ratio")).toBeInTheDocument();
    expect(screen.getByText("1.23")).toBeInTheDocument();
  });

  it("shows an error state when the metrics fail to load", async () => {
    mock.onGet("/portfolio/performance").reply(500);

    render(<RiskMetricsPage />);

    expect(
      await screen.findByText("Failed to load risk metrics"),
    ).toBeInTheDocument();
  });
});
