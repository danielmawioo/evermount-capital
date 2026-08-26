import { render, screen } from "@testing-library/react";
import PortfolioInsightsPage from "./page";

describe("PortfolioInsightsPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<PortfolioInsightsPage />);
    expect(
      screen.getByRole("heading", {
        name: /portfolio insights that drive performance/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the key capability tiles", () => {
    render(<PortfolioInsightsPage />);
    expect(screen.getByText("Return Analysis")).toBeInTheDocument();
    expect(screen.getByText("Volatility Tracking")).toBeInTheDocument();
    expect(screen.getByText("Drawdown Monitoring")).toBeInTheDocument();
    expect(screen.getByText("Benchmark Comparison")).toBeInTheDocument();
  });

  it("renders the growth curve and risk distribution sections with a CTA", () => {
    render(<PortfolioInsightsPage />);
    expect(
      screen.getByRole("heading", { name: /growth curve analysis/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /risk distribution/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get access/i }),
    ).toBeInTheDocument();
  });
});
