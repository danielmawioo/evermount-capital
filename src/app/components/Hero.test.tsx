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
        name: /We build intelligent financial systems that understand markets/i,
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Explore the Platform/i }),
    ).toHaveAttribute("href", "/platform");

    const talkToTeamLink = screen.getByRole("link", {
      name: /Talk to Our Team/i,
    });
    expect(talkToTeamLink).toHaveAttribute("href", "/book-demo");

    expect(screen.getByText("Market Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
    expect(screen.getByText("Risk Intelligence")).toBeInTheDocument();

    expect(screen.getByTestId("live-market-ticker")).toBeInTheDocument();
  });
});
