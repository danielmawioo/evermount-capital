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

  it("renders the key performance metrics", () => {
    render(<PortfolioInsightsPage />);
    expect(screen.getByText("Annualized Return")).toBeInTheDocument();
    expect(screen.getByText("18.5%")).toBeInTheDocument();
    expect(screen.getByText("Volatility Index")).toBeInTheDocument();
    expect(screen.getByText("Max Drawdown")).toBeInTheDocument();
    expect(screen.getByText("Sharpe Ratio")).toBeInTheDocument();
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
