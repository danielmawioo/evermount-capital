import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

// LiveMarketTicker owns its own polling/animation logic and isn't part of
// this batch's assigned components; stub it so Hero can be tested in
// isolation without leaking timers.
jest.mock("./LiveMarketTicker", () => {
  function MockLiveMarketTicker() {
    return <div data-testid="live-market-ticker">Ticker</div>;
  }
  return MockLiveMarketTicker;
});

describe("Hero", () => {
  it("renders the headline, CTA links and trust metrics", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: "Building Africa's Quantitative Trading Infrastructure",
        level: 1,
      }),
    ).toBeInTheDocument();

    const talkToTeamLink = screen.getByRole("link", {
      name: /Talk to Our Team/i,
    });
    expect(talkToTeamLink).toHaveAttribute("href", "/book-demo");

    expect(
      screen.getByRole("button", { name: /Get Early Access/i }),
    ).toBeInTheDocument();

    expect(screen.getByText("Data-Driven Alpha")).toBeInTheDocument();
    expect(screen.getByText("AI-Powered Research")).toBeInTheDocument();
    expect(screen.getByText("Risk-Managed Trading")).toBeInTheDocument();

    expect(screen.getByTestId("live-market-ticker")).toBeInTheDocument();
  });

  it("dispatches an openWaitlist window event when the early access CTA is clicked", () => {
    const dispatchSpy = jest.spyOn(window, "dispatchEvent");
    render(<Hero />);

    screen.getByRole("button", { name: /Get Early Access/i }).click();

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "openWaitlist" }),
    );
    dispatchSpy.mockRestore();
  });
});
