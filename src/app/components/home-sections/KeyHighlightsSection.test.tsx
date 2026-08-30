import { render, screen } from "@testing-library/react";
import KeyHighlightsSection from "./KeyHighlightsSection";

describe("KeyHighlightsSection", () => {
  it("renders the heading, subtitle, and capability cards", () => {
    render(<KeyHighlightsSection />);

    expect(screen.getByText("What Evermount Builds")).toBeInTheDocument();
    expect(
      screen.getByText(
        "AI financial intelligence, quantitative research and trading infrastructure for African markets.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Market Intelligence")).toBeInTheDocument();
    expect(screen.getByText("AI Quant Research")).toBeInTheDocument();
    expect(screen.getByText("Market Infrastructure")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Build toward deeper electronic connectivity and liquidity across African financial markets.",
      ),
    ).toBeInTheDocument();
  });
});
