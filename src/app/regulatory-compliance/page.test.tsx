import { render, screen } from "@testing-library/react";
import RegulatoryCompliancePage, { metadata } from "./page";

describe("RegulatoryCompliancePage", () => {
  it("renders the regulatory compliance content", () => {
    render(<RegulatoryCompliancePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Regulatory Compliance & Licensing/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe("Regulatory Compliance | Evermount Capital");
  });
});
