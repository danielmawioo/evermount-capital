import { render, screen } from "@testing-library/react";
import ApproachAndValuesSection from "./ApproachAndValuesSection";

describe("ApproachAndValuesSection", () => {
  it("renders the approach and core values headings", () => {
    render(<ApproachAndValuesSection />);

    expect(
      screen.getByRole("heading", { name: "Our Investment Approach" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Our Core Values" }),
    ).toBeInTheDocument();
  });

  it("renders each approach item", () => {
    render(<ApproachAndValuesSection />);

    expect(
      screen.getByText("Systematic & Data-Driven"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Multi-Strategy Diversification"),
    ).toBeInTheDocument();
    expect(screen.getByText("Risk-First Philosophy")).toBeInTheDocument();
  });

  it("renders each core value", () => {
    render(<ApproachAndValuesSection />);

    expect(screen.getByText("Transparency")).toBeInTheDocument();
    expect(screen.getByText("Innovation")).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
    expect(screen.getByText("Excellence")).toBeInTheDocument();
    expect(
      screen.getByText(/Ethical conduct and regulatory compliance/),
    ).toBeInTheDocument();
  });
});
