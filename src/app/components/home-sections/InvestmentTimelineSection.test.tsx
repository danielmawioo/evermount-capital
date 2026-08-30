import { render, screen } from "@testing-library/react";
import InvestmentTimelineSection from "./InvestmentTimelineSection";

describe("InvestmentTimelineSection", () => {
  it("renders the heading and all pipeline stages", () => {
    render(<InvestmentTimelineSection />);

    expect(
      screen.getByText("How Evermount Turns Intelligence Into Action"),
    ).toBeInTheDocument();

    expect(screen.getByText("01 — Understand")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Our systems ingest and analyze market, macroeconomic, fundamental and alternative data.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("04 — Execute")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Validated strategies move through systematic execution infrastructure with defined controls and monitoring.",
      ),
    ).toBeInTheDocument();
  });
});
