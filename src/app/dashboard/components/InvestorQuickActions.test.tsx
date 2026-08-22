import { render, screen } from "@testing-library/react";
import InvestorQuickActions from "./InvestorQuickActions";
import { INVESTOR_TIERS } from "@/lib/investor-tiers";

describe("InvestorQuickActions", () => {
  it("prompts for KYC verification when not approved, regardless of tier", () => {
    render(
      <InvestorQuickActions tier={INVESTOR_TIERS.BASIC} kycApproved={false} />,
    );

    const link = screen.getByRole("link", {
      name: /Complete verification to start investing/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dashboard/kyc");
    expect(screen.queryByText("Deposit")).not.toBeInTheDocument();
  });

  it("renders the actions available to a BASIC tier investor without dedicated support", () => {
    render(
      <InvestorQuickActions tier={INVESTOR_TIERS.BASIC} kycApproved={true} />,
    );

    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("Withdraw")).toBeInTheDocument();
    expect(screen.getByText("Trade")).toBeInTheDocument();
    expect(screen.getByText("Statements")).toBeInTheDocument();
    expect(screen.queryByText(/Contact your/)).not.toBeInTheDocument();
  });

  it("shows the dedicated support link for a PREMIUM tier investor", () => {
    render(
      <InvestorQuickActions tier={INVESTOR_TIERS.PREMIUM} kycApproved={true} />,
    );

    const supportLink = screen.getByRole("link", {
      name: /Contact your priority support/i,
    });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute("href", "/dashboard/help");
  });

  it("links each action to its expected href", () => {
    render(
      <InvestorQuickActions
        tier={INVESTOR_TIERS.ENTERPRISE}
        kycApproved={true}
      />,
    );

    expect(screen.getByText("Deposit").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/deposit",
    );
    expect(screen.getByText("Withdraw").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/withdraw",
    );
    expect(screen.getByText("Trade").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/trade",
    );
    expect(screen.getByText("Statements").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/statements",
    );
  });
});
