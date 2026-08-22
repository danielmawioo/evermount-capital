import { render, screen } from "@testing-library/react";
import TradePreviewCard, { TradePreview } from "./TradePreviewCard";

const PREVIEW: TradePreview = {
  investmentOptionId: "opt-1",
  programName: "Momentum Growth",
  strategyKey: "momentum",
  riskLevel: "MODERATE_RISK",
  lockInMonths: 12,
  lockInEndsAt: "2025-01-01T00:00:00.000Z",
  amount: 15000,
  allocationReason: "Matches your risk tolerance and plan minimum.",
  planType: "PREMIUM",
  minInvestment: 10000,
};

describe("TradePreviewCard", () => {
  it("renders the recommended program, amount, and formatted risk level", () => {
    render(<TradePreviewCard preview={PREVIEW} tierLabel="Growth" />);

    expect(screen.getByText("Momentum Growth")).toBeInTheDocument();
    expect(screen.getByText("$15,000.00")).toBeInTheDocument();
    expect(screen.getByText("12 months")).toBeInTheDocument();
    expect(screen.getByText("Moderate risk")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
    expect(
      screen.getByText(PREVIEW.allocationReason)
    ).toBeInTheDocument();
  });
});
