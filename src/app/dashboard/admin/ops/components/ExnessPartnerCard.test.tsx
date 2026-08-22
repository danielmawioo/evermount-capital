import { render, screen } from "@testing-library/react";
import ExnessPartnerCard from "./ExnessPartnerCard";

describe("ExnessPartnerCard", () => {
  it("shows disabled state and setup hint when nothing is configured", () => {
    render(<ExnessPartnerCard exnessPartner={null} />);

    expect(screen.getByText("Disabled")).toBeInTheDocument();
    expect(
      screen.getByText(/Set EXNESS_PARTNER_REFERRAL_LINK/i),
    ).toBeInTheDocument();
  });

  it("shows connected summary data and a configured referral link", () => {
    render(
      <ExnessPartnerCard
        exnessPartner={{
          status: {
            enabled: true,
            connected: true,
            broker: "exness",
            baseUrl: "https://partner.exness.com",
            referralLink: "https://one.exnessonelink.com/a/abc123",
            referralLinkSource: "configured",
          },
          summary: {
            connected: true,
            broker: "exness",
            referralLink: "https://one.exnessonelink.com/a/abc123",
            referralLinkSource: "configured",
            defaultLink: null,
            wallet: { summary_equity: 12345 },
            clients: { total: 7 },
            rewards: { totalCommissionUsd: 89 },
          },
        }}
      />,
    );

    expect(screen.getByText("Connected")).toBeInTheDocument();
    expect(screen.getByText("$12,345")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("$89")).toBeInTheDocument();
    expect(screen.getByText(/\(configured\)/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "https://one.exnessonelink.com/a/abc123",
      }),
    ).toHaveAttribute("href", "https://one.exnessonelink.com/a/abc123");
  });

  it("shows a not-connected state with an error message when enabled but failing", () => {
    render(
      <ExnessPartnerCard
        exnessPartner={{
          status: {
            enabled: true,
            connected: false,
            broker: "exness",
            baseUrl: "https://partner.exness.com",
            error: "Invalid API credentials",
          },
          summary: null,
        }}
      />,
    );

    expect(screen.getByText("Not connected")).toBeInTheDocument();
    expect(screen.getByText("Invalid API credentials")).toBeInTheDocument();
  });
});
