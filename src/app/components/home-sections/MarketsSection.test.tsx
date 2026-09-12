import { render, screen } from "@testing-library/react";
import MarketsSection from "./MarketsSection";

describe("MarketsSection", () => {
  it("renders market-agnostic asset class cards", () => {
    render(<MarketsSection />);

    expect(screen.getByText("Markets")).toBeInTheDocument();
    expect(screen.getByText("Equities")).toBeInTheDocument();
    expect(screen.getByText("Foreign Exchange")).toBeInTheDocument();
    expect(screen.getByText("Digital Assets")).toBeInTheDocument();
  });
});
