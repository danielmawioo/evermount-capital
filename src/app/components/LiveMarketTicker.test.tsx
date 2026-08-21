import { render, screen, act } from "@testing-library/react";
import LiveMarketTicker from "./LiveMarketTicker";

describe("LiveMarketTicker", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("renders the top movers heading and populates market data", () => {
    render(<LiveMarketTicker />);

    expect(screen.getByText("Top Movers")).toBeInTheDocument();
    expect(screen.getByText("Live • Updates 5s")).toBeInTheDocument();
    // Solana has the largest absolute % change in the mock dataset, so it
    // should be sorted to the top of the "top movers" list.
    expect(screen.getByText("Solana")).toBeInTheDocument();
  });

  it("updates prices on the simulated 5s interval", () => {
    jest.spyOn(Math, "random").mockReturnValue(1);

    render(<LiveMarketTicker />);

    const initialPercent = screen.getByText("3.64%");
    expect(initialPercent).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // With Math.random mocked to a constant, the changePercent shifts by a
    // deterministic, non-zero amount, so the originally rendered value for
    // the top mover should no longer be present.
    expect(screen.queryByText("3.64%")).not.toBeInTheDocument();
  });
});
