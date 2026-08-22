import { render, screen } from "@testing-library/react";
import RiskMetricsPage from "./page";

describe("RiskMetricsPage", () => {
  it("renders the risk metrics overview with all metric cards", () => {
    render(<RiskMetricsPage />);

    expect(
      screen.getByRole("heading", { name: "Risk Metrics Overview" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sharpe Ratio")).toBeInTheDocument();
    expect(screen.getByText("1.23")).toBeInTheDocument();
  });
});
