import { render, screen } from "@testing-library/react";
import StatsSection from "./StatsSection";

describe("StatsSection", () => {
  it("renders the heading and all stats", () => {
    render(<StatsSection />);

    expect(
      screen.getByText("The Infrastructure Behind Evermount"),
    ).toBeInTheDocument();

    expect(screen.getByText("Quantitative")).toBeInTheDocument();
    expect(screen.getByText("Research & Modeling")).toBeInTheDocument();
    expect(screen.getByText("Institutional-Grade")).toBeInTheDocument();
    expect(screen.getByText("Risk Management")).toBeInTheDocument();
  });
});
