import { render, screen } from "@testing-library/react";
import RoadmapSection from "./RoadmapSection";

describe("RoadmapSection", () => {
  it("renders the section heading and all roadmap steps", () => {
    render(<RoadmapSection />);

    expect(screen.getByText("Investor Journey Roadmap")).toBeInTheDocument();

    expect(screen.getByText("1. Onboarding")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Create an account and complete KYC verification securely.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("2. Fund Wallet")).toBeInTheDocument();
    expect(screen.getByText("3. Portfolio Allocation")).toBeInTheDocument();

    expect(screen.getByText("4. Performance Monitoring")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Real-time portfolio analytics and quarterly performance attribution reports\./,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "1. Onboarding" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "4. Performance Monitoring" }),
    ).toBeInTheDocument();
  });
});
