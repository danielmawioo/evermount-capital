import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

jest.mock("./LiveMarketTicker", () => {
  function MockLiveMarketTicker() {
    return <div data-testid="live-market-ticker">Ticker</div>;
  }
  return MockLiveMarketTicker;
});

describe("Hero", () => {
  it("renders the headline, CTA links and capability labels", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: /Financial Infrastructure for Modern Markets/i,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Explore Platform/i }),
    ).toHaveAttribute("href", "/platform");

    const requestAccess = screen.getByRole("link", {
      name: /Request Access/i,
    });
    expect(requestAccess).toHaveAttribute("href", "/book-demo");

    expect(screen.getByText("Market Data")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
    expect(screen.getByText("Risk Infrastructure")).toBeInTheDocument();

    expect(screen.getByTestId("live-market-ticker")).toBeInTheDocument();
  });
});
