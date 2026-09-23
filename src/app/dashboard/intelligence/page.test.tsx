import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import IntelligencePage from "./page";
import { api } from "@/lib/api-client";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api-client", () => ({
  api: {
    markets: {
      list: jest.fn(),
    },
  },
}));

jest.mock("@/lib/logger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe("IntelligencePage", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  describe("authentication", () => {
    it("shows Request Access when no token is present", async () => {
      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("Request Access")).toBeInTheDocument();
      });

      expect(
        screen.getByText(/Market intelligence features require authentication/i),
      ).toBeInTheDocument();
      expect(api.markets.list).not.toHaveBeenCalled();
    });

    it("shows Request Access on 401 response", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockRejectedValue({
        response: { status: 401 },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("Request Access")).toBeInTheDocument();
      });
    });

    it("shows Request Access on 403 response", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockRejectedValue({
        response: { status: 403 },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("Request Access")).toBeInTheDocument();
      });
    });
  });

  describe("data loading", () => {
    it("shows loading state initially when authenticated", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockImplementation(
        () => new Promise(() => {}),
      );

      render(<IntelligencePage />);

      expect(screen.getByText("Loading market data...")).toBeInTheDocument();
    });

    it("displays DELAYED instruments with quote data", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockResolvedValue({
        data: {
          instruments: [
            {
              symbol: "XAUUSD",
              name: "Gold Spot",
              delayClass: "DELAYED",
              quote: {
                last: 2050.5,
                bid: 2050.3,
                ask: 2050.7,
                volume: 15000,
                source: "XE",
                observedAt: "2026-09-23T15:30:00Z",
                ingestedAt: "2026-09-23T15:30:05Z",
                ageMs: 5000,
              },
            },
          ],
        },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("XAUUSD")).toBeInTheDocument();
      });

      expect(screen.getByText("Gold Spot")).toBeInTheDocument();
      expect(screen.getByText("Delayed")).toBeInTheDocument();
      expect(screen.getByText("$2,050.50")).toBeInTheDocument();
      expect(screen.getByText("$2,050.30")).toBeInTheDocument();
      expect(screen.getByText("$2,050.70")).toBeInTheDocument();
      expect(screen.getByText("15,000")).toBeInTheDocument();
      expect(screen.getByText("XE")).toBeInTheDocument();
    });

    it("displays STALE instruments with appropriate badge", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockResolvedValue({
        data: {
          instruments: [
            {
              symbol: "GC",
              name: "Gold Futures",
              delayClass: "STALE",
              quote: {
                last: 2048.2,
                bid: 2048.0,
                ask: 2048.4,
                volume: 8000,
                source: "CME",
                observedAt: "2026-09-23T14:00:00Z",
                ingestedAt: "2026-09-23T14:00:10Z",
                ageMs: 1200000,
              },
            },
          ],
        },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("GC")).toBeInTheDocument();
      });

      expect(screen.getByText("Gold Futures")).toBeInTheDocument();
      expect(screen.getByText("Stale")).toBeInTheDocument();
      expect(screen.getByText("$2,048.20")).toBeInTheDocument();
    });

    it("displays UNAVAILABLE instruments without quote board", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockResolvedValue({
        data: {
          instruments: [
            {
              symbol: "XAGUSD",
              name: "Silver Spot",
              delayClass: "UNAVAILABLE",
              quote: null,
            },
          ],
        },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("XAGUSD")).toBeInTheDocument();
      });

      expect(screen.getByText("Silver Spot")).toBeInTheDocument();
      expect(screen.getByText("Unavailable")).toBeInTheDocument();
      expect(screen.getByText("Quote data unavailable")).toBeInTheDocument();
    });

    it("shows empty state when no instruments returned", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockResolvedValue({
        data: {
          instruments: [],
        },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(
          screen.getByText("No market data available"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("error handling", () => {
    it("shows retry UI on 500 error", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockRejectedValue({
        response: { status: 500 },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(
          screen.getByText("Service temporarily unavailable. Please try again."),
        ).toBeInTheDocument();
      });

      expect(screen.getByText("Retry")).toBeInTheDocument();
    });

    it("shows generic error for non-5xx errors", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockRejectedValue({
        response: { status: 400 },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(
          screen.getByText("Failed to load market data"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("informational disclaimer", () => {
    it("shows disclaimer about market data types", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockResolvedValue({
        data: {
          instruments: [
            {
              symbol: "XAUUSD",
              name: "Gold Spot",
              delayClass: "DELAYED",
              quote: {
                last: 2050.5,
                bid: 2050.3,
                ask: 2050.7,
                volume: 15000,
                source: "XE",
                observedAt: "2026-09-23T15:30:00Z",
                ingestedAt: "2026-09-23T15:30:05Z",
                ageMs: 5000,
              },
            },
          ],
        },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("About Market Data")).toBeInTheDocument();
      });

      expect(
        screen.getByText(/Data delayed by up to 15 minutes/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Data older than 15 minutes/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Quote data not currently available/i),
      ).toBeInTheDocument();
    });
  });
});
