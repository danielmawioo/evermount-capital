import { render, screen } from "@testing-library/react";
import FundHighlightsSection from "./FundHighlightsSection";

describe("FundHighlightsSection", () => {
  it("renders the capital heading and all fund points", () => {
    render(<FundHighlightsSection />);

    expect(screen.getByText("Evermount Capital")).toBeInTheDocument();
    expect(screen.getByText("Management Fee: 1.5% - 2.5%")).toBeInTheDocument();
    expect(
      screen.getByText("USD + Multi-Currency Support"),
    ).toBeInTheDocument();
  });
});
