import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", {
        name: /investment minimums & fee structure/i,
      })
    ).toBeInTheDocument();
  });

  it("renders a pricing tier column for each investment tier", () => {
    render(<PricingPage />);
    expect(screen.getByText("$10,000")).toBeInTheDocument();
    expect(screen.getByText("$50,000")).toBeInTheDocument();
    expect(screen.getByText("$250,000")).toBeInTheDocument();
    expect(screen.getByText("$1,000,000+")).toBeInTheDocument();
  });

  it("renders fee and feature rows in the comparison table", () => {
    render(<PricingPage />);
    expect(screen.getByText("Management Fee (Annual)")).toBeInTheDocument();
    expect(screen.getByText("Performance Fee")).toBeInTheDocument();
    expect(screen.getByText("Portfolio Dashboard")).toBeInTheDocument();
    // "dashboard: true" for every tier renders as a checkmark
    expect(screen.getAllByText("✅")).toHaveLength(4);
  });
});
