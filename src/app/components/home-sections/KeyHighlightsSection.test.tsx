import { render, screen } from "@testing-library/react";
import KeyHighlightsSection from "./KeyHighlightsSection";

describe("KeyHighlightsSection", () => {
  it("renders the heading, subtitle, and capability cards", () => {
    render(<KeyHighlightsSection />);

    expect(screen.getByText("What Evermount Builds")).toBeInTheDocument();
    expect(screen.getByText("Market Data")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
    expect(screen.getByText("Connectivity")).toBeInTheDocument();
  });
});
