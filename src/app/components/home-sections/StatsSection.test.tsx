import { render, screen } from "@testing-library/react";
import StatsSection from "./StatsSection";

describe("StatsSection", () => {
  it("renders the heading and all infrastructure layers", () => {
    render(<StatsSection />);

    expect(
      screen.getByText("The Infrastructure Behind Modern Markets"),
    ).toBeInTheDocument();

    expect(screen.getByText("Market Data")).toBeInTheDocument();
    expect(screen.getByText("Quant Research")).toBeInTheDocument();
    expect(screen.getByText("AI & Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Connectivity")).toBeInTheDocument();
  });
});
