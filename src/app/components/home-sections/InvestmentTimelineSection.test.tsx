import { render, screen } from "@testing-library/react";
import InvestmentTimelineSection from "./InvestmentTimelineSection";

describe("InvestmentTimelineSection", () => {
  it("renders market-agnostic asset class cards", () => {
    render(<InvestmentTimelineSection />);

    expect(screen.getByText("Markets")).toBeInTheDocument();
    expect(screen.getByText("Equities")).toBeInTheDocument();
    expect(screen.getByText("Foreign Exchange")).toBeInTheDocument();
    expect(screen.getByText("Digital Assets")).toBeInTheDocument();
  });
});
