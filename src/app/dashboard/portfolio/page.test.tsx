import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import PortfolioPage from "./page";

const PORTFOLIO = {
  totalValue: 12000,
  totalInvested: 10000,
  totalReturn: 2000,
  totalReturnPercent: 20,
  holdings: [
    {
      id: "h1",
      assetName: "Momentum Fund",
      symbol: "MOM",
      strategyKey: "momentum",
      value: 12000,
      return: 2000,
      returnPercent: 20,
      type: "Strategy",
      lockInEndsAt: null,
    },
  ],
};

const PERFORMANCE = {
  equityCurve: [{ date: "2024-01-01", equity: 10000 }],
  metrics: {
    gainPercent: 20,
    absGain: 2000,
    dailyPercent: 0.1,
    monthlyPercent: 2,
    maxDrawdown: -5,
    volatility: 3,
    sharpeRatio: 1.1,
    balance: 12000,
    equity: 12000,
  },
};

describe("PortfolioPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders portfolio holdings and performance", async () => {
    mock.onGet("/portfolio").reply(200, PORTFOLIO);
    mock.onGet("/portfolio/performance").reply(200, PERFORMANCE);

    render(<PortfolioPage />);

    expect(
      await screen.findByRole("heading", { name: "Portfolio" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Momentum Fund")).toBeInTheDocument();
    expect(screen.getAllByText(/\+20\.00%/).length).toBeGreaterThan(0);
  });

  it("shows an error state when the portfolio fails to load", async () => {
    mock.onGet("/portfolio").reply(500);
    mock.onGet("/portfolio/performance").reply(500);

    render(<PortfolioPage />);

    expect(
      await screen.findByText("Failed to load portfolio"),
    ).toBeInTheDocument();
  });

  it("reloads performance data for a different period", async () => {
    mock.onGet("/portfolio").reply(200, PORTFOLIO);
    mock.onGet("/portfolio/performance").reply(200, PERFORMANCE);

    const user = userEvent.setup();
    render(<PortfolioPage />);

    await screen.findByText("Momentum Fund");
    await user.click(screen.getByRole("button", { name: "7D" }));

    await waitFor(() => {
      const perfRequests = mock.history.get.filter(
        (r) => r.url === "/portfolio/performance",
      );
      expect(perfRequests[perfRequests.length - 1].params).toMatchObject({
        period: "7d",
      });
    });
  });
});
