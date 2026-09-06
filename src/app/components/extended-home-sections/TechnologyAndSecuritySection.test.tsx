import { render, screen } from "@testing-library/react";
import TechnologyAndSecuritySection from "./TechnologyAndSecuritySection";

describe("TechnologyAndSecuritySection", () => {
  it("renders the technology pillars heading and all pillars", () => {
    render(<TechnologyAndSecuritySection />);

    expect(
      screen.getByText("The Evermount Technology Stack"),
    ).toBeInTheDocument();

    expect(screen.getByText("AI Financial Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Risk Intelligence Engine")).toBeInTheDocument();
    expect(screen.getByText("High-Performance Execution")).toBeInTheDocument();
  });

  it("renders the security heading and all security features", () => {
    render(<TechnologyAndSecuritySection />);

    expect(
      screen.getByText("Institutional-Grade Infrastructure & Risk Controls"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "256-bit AES encryption for data at rest and in transit",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Independent risk oversight and compliance monitoring"),
    ).toBeInTheDocument();
  });
});
