import { render, screen } from "@testing-library/react";
import FundHighlightsSection from "./FundHighlightsSection";

describe("FundHighlightsSection", () => {
  it("renders the heading and all fund points", () => {
    render(<FundHighlightsSection />);

    expect(screen.getByText("Fund Highlights")).toBeInTheDocument();
    expect(screen.getByText("Management Fee: 1.5% - 2.5%")).toBeInTheDocument();
    expect(
      screen.getByText("USD + Multi-Currency Support"),
    ).toBeInTheDocument();
  });
});
