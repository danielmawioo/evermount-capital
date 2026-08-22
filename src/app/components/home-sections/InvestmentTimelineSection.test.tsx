import { render, screen } from "@testing-library/react";
import InvestmentTimelineSection from "./InvestmentTimelineSection";

describe("InvestmentTimelineSection", () => {
  it("renders the heading and all steps", () => {
    render(<InvestmentTimelineSection />);

    expect(screen.getByText("How We Manage Your Capital")).toBeInTheDocument();

    expect(
      screen.getByText("Step 1 – Investor Onboarding"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "KYC verification, risk profiling, and investment mandate alignment.",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Step 4 – Performance Monitoring"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Real-time portfolio analytics and quarterly performance attribution reports.",
      ),
    ).toBeInTheDocument();
  });
});
