import { render, screen } from "@testing-library/react";
import CombinedMetricsCard from "./CombinedMetricsCard";

describe("CombinedMetricsCard", () => {
  it("renders AUM-weighted portfolio metrics", () => {
    render(
      <CombinedMetricsCard
        combined={{
          totalPoolAum: 200000,
          totalInvestors: 10,
          strategyCount: 2,
          activeCount: 1,
          primaryStrategy: "momentum",
          weightedDailyReturnPct: 0.8,
          weightedCumulativeReturnPct: 5.5,
          blendedNavPerUnit: 1.03,
          quantConnected: true,
          flipbotConnected: false,
          killSwitchActive: false,
          tradingMode: "paper",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Combined Portfolio Metrics" }),
    ).toBeInTheDocument();
    expect(screen.getByText("$200,000")).toBeInTheDocument();
    expect(screen.getByText("Connected")).toBeInTheDocument();
    expect(screen.getByText("Offline")).toBeInTheDocument();
  });
});
