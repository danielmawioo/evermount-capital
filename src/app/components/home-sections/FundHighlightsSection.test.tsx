import { render, screen } from "@testing-library/react";
import FundHighlightsSection from "./FundHighlightsSection";

describe("FundHighlightsSection", () => {
  it("renders infrastructure capabilities instead of fund fees", () => {
    render(<FundHighlightsSection />);

    expect(screen.getByText("Infrastructure Capabilities")).toBeInTheDocument();
    expect(screen.getByText("Real-time market data")).toBeInTheDocument();
    expect(screen.getByText("APIs")).toBeInTheDocument();
  });
});
