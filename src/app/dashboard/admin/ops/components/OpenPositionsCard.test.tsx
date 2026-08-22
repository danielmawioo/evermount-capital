import { render, screen } from "@testing-library/react";
import OpenPositionsCard from "./OpenPositionsCard";

describe("OpenPositionsCard", () => {
  it("shows the fallback message when there are no open positions reported", () => {
    render(<OpenPositionsCard positionsCount={undefined} />);

    expect(screen.getByText("Open Positions")).toBeInTheDocument();
    expect(
      screen.getByText("No open positions reported (paper trading)"),
    ).toBeInTheDocument();
  });

  it("shows the fallback message when positionsCount is zero", () => {
    render(<OpenPositionsCard positionsCount={0} />);

    expect(
      screen.getByText("No open positions reported (paper trading)"),
    ).toBeInTheDocument();
  });

  it("shows the position count when positions are reported", () => {
    render(<OpenPositionsCard positionsCount={3} />);

    expect(screen.getByText("3 position(s)")).toBeInTheDocument();
  });
});
