import { render, screen } from "@testing-library/react";
import InfrastructureCapabilitiesSection from "./InfrastructureCapabilitiesSection";

describe("InfrastructureCapabilitiesSection", () => {
  it("renders infrastructure capabilities instead of fund fees", () => {
    render(<InfrastructureCapabilitiesSection />);

    expect(screen.getByText("Infrastructure Capabilities")).toBeInTheDocument();
    expect(screen.getByText("Real-time market data")).toBeInTheDocument();
    expect(screen.getByText("APIs")).toBeInTheDocument();
  });
});
