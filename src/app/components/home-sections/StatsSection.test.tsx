import { render, screen } from "@testing-library/react";
import StatsSection from "./StatsSection";

describe("StatsSection", () => {
  it("renders the heading and all infrastructure layers", () => {
    render(<StatsSection />);

    expect(
      screen.getByText("The Intelligence Infrastructure Behind Evermount"),
    ).toBeInTheDocument();

    expect(screen.getByText("Financial Data")).toBeInTheDocument();
    expect(screen.getByText("AI & Machine Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
    expect(screen.getByText("Risk & Execution")).toBeInTheDocument();
  });
});
