import { render, screen } from "@testing-library/react";
import TradingMetricsGrid from "./TradingMetricsGrid";

describe("TradingMetricsGrid", () => {
  it("renders all metric cells with formatted values for positive gains", () => {
    render(
      <TradingMetricsGrid
        metrics={{
          gainPercent: 12.345,
          absGain: 1234.5,
          dailyPercent: 0.5,
          monthlyPercent: 3.2,
          maxDrawdown: 4.1,
          volatility: 1.1,
          sharpeRatio: 1.87,
          balance: 10000,
          equity: 11234.5,
        }}
      />,
    );

    expect(screen.getByText("Account Summary")).toBeInTheDocument();
    expect(screen.getByText("+12.35%")).toBeInTheDocument();
    expect(screen.getByText("$1,234.50")).toBeInTheDocument();
    expect(screen.getByText("+0.50%")).toBeInTheDocument();
    expect(screen.getByText("+3.20%")).toBeInTheDocument();
    expect(screen.getByText("4.10%")).toBeInTheDocument();
    expect(screen.getByText("$10,000.00")).toBeInTheDocument();
    expect(screen.getByText("$11,234.50")).toBeInTheDocument();
    expect(screen.getByText("1.87")).toBeInTheDocument();
  });

  it("renders negative percentages without a plus sign and a dash for a null Sharpe ratio", () => {
    render(
      <TradingMetricsGrid
        metrics={{
          gainPercent: -5.5,
          absGain: -550,
          dailyPercent: -0.2,
          monthlyPercent: -1.1,
          maxDrawdown: 8.9,
          volatility: 2.4,
          sharpeRatio: null,
          balance: 5000,
          equity: 4450,
        }}
      />,
    );

    expect(screen.getByText("-5.50%")).toBeInTheDocument();
    expect(screen.getByText("-$550.00")).toBeInTheDocument();
    expect(screen.getByText("-0.20%")).toBeInTheDocument();
    expect(screen.getByText("-1.10%")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("formats currency using the provided currency code", () => {
    render(
      <TradingMetricsGrid
        metrics={{
          gainPercent: 1,
          absGain: 100,
          dailyPercent: 0.1,
          monthlyPercent: 0.5,
          maxDrawdown: 1,
          volatility: 0.5,
          sharpeRatio: 0,
          balance: 200,
          equity: 300,
        }}
        currency="EUR"
      />,
    );

    expect(screen.getByText("€200.00")).toBeInTheDocument();
    expect(screen.getByText("€300.00")).toBeInTheDocument();
  });
});
