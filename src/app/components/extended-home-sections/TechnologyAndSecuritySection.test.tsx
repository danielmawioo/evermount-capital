import { render, screen } from "@testing-library/react";
import TechnologyAndSecuritySection from "./TechnologyAndSecuritySection";

describe("TechnologyAndSecuritySection", () => {
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
    expect(
      screen.queryByText("The Evermount Technology Stack"),
    ).not.toBeInTheDocument();
  });
});
