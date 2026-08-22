import { render, screen } from "@testing-library/react";
import AllocationPreviewPanel, {
  type AllocationPreview,
} from "./AllocationPreviewPanel";

const BASE_PREVIEW: AllocationPreview = {
  programName: "Growth Momentum",
  strategyKey: "momentum",
  riskLevel: "MEDIUM_HIGH",
  amount: 5000,
  currency: "USD",
  availableBalance: 10000,
  totalInvested: 2000,
  totalPortfolioValue: 12000,
  balanceAfterAllocation: 5000,
  allocationPctOfPortfolio: 41.67,
  strategyExposureAfterPct: 25,
  lockInMonths: 6,
  lockInEndsAt: "2027-02-22T00:00:00.000Z",
  planType: "PRO",
  clientRiskTolerance: "MODERATE",
  minInvestment: 100,
  meetsMinimum: true,
  sufficientFunds: true,
  canAllocate: true,
  riskLeverage: 2,
  effectiveExposure: 10000,
  maxRiskBudgetPct: 5,
  maxRiskBudgetUsd: 500,
  poolAum: 1000000,
  poolSharePct: 0.5,
  navPerUnit: 1.2345,
  strategyDailyReturnPct: 1.5,
  strategyCumulativeReturnPct: 12.3,
  warnings: [],
};

describe("AllocationPreviewPanel", () => {
  it("renders nothing when there is no preview and not loading", () => {
    const { container } = render(<AllocationPreviewPanel preview={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows a loading placeholder while calculating", () => {
    render(<AllocationPreviewPanel preview={null} loading />);
    expect(
      screen.getByText("Calculating allocation metrics…")
    ).toBeInTheDocument();
  });

  it("renders full preview metrics when canAllocate is true and there are no warnings", () => {
    render(<AllocationPreviewPanel preview={BASE_PREVIEW} />);

    expect(screen.getByText("Allocation preview")).toBeInTheDocument();
    expect(screen.getByText(/Growth Momentum/)).toBeInTheDocument();
    expect(screen.getByText(/momentum/)).toBeInTheDocument();
    expect(screen.getByText("Ready to allocate")).toBeInTheDocument();
    expect(screen.getByText("$5,000")).toBeInTheDocument();
    expect(screen.getByText("+41.67%")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
    expect(screen.getByText("PRO")).toBeInTheDocument();
    expect(screen.getByText("1.2345")).toBeInTheDocument();
  });

  it("renders warnings and a cannot-allocate badge when the allocation is blocked", () => {
    const blocked: AllocationPreview = {
      ...BASE_PREVIEW,
      canAllocate: false,
      sufficientFunds: false,
      warnings: ["Amount exceeds available balance"],
    };

    render(<AllocationPreviewPanel preview={blocked} />);

    expect(screen.getByText("Cannot allocate")).toBeInTheDocument();
    expect(
      screen.getByText("• Amount exceeds available balance")
    ).toBeInTheDocument();
  });

  it("handles zero and negative-return edge values without throwing", () => {
    const edge: AllocationPreview = {
      ...BASE_PREVIEW,
      amount: 0,
      availableBalance: 0,
      strategyDailyReturnPct: -3.25,
      strategyCumulativeReturnPct: -10,
      poolAum: 1_500_000_000,
      strategyKey: null,
    };

    render(<AllocationPreviewPanel preview={edge} />);

    expect(screen.getAllByText("$0.00").length).toBeGreaterThan(0);
    expect(screen.getByText("-3.25%")).toBeInTheDocument();
    expect(screen.getByText("-10.00%")).toBeInTheDocument();
    expect(screen.getByText("$1,500,000,000")).toBeInTheDocument();
  });
});
