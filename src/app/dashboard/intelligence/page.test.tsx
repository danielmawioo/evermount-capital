import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import IntelligencePage from "./page";
import { api } from "@/lib/api-client";
import { MI_COPY } from "@/lib/mi-copy";

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
  const originalEnv = process.env.NEXT_PUBLIC_MI_ENABLED;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MI_ENABLED = originalEnv;
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_MI_ENABLED = originalEnv;
  });

  describe("feature flag", () => {
    it("redirects to dashboard when MI is disabled", async () => {
      process.env.NEXT_PUBLIC_MI_ENABLED = "false";
      localStorage.setItem("token", "fake-token");

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
      });
    });

    it("does not redirect when MI is enabled", async () => {
      process.env.NEXT_PUBLIC_MI_ENABLED = "true";
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockImplementation(
        () => new Promise(() => {}),
      );

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText(MI_COPY.states.loading)).toBeInTheDocument();
      });

      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });

  describe("authentication", () => {
    it("shows Request Access when no token is present", async () => {
      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText(MI_COPY.requestAccess.title)).toBeInTheDocument();
      });

      expect(
        screen.getByText(MI_COPY.requestAccess.message),
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
        expect(screen.getByText(MI_COPY.requestAccess.title)).toBeInTheDocument();
      });
    });

    it("shows Request Access on 403 response", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockRejectedValue({
        response: { status: 403 },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText(MI_COPY.requestAccess.title)).toBeInTheDocument();
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

      expect(screen.getByText(MI_COPY.states.loading)).toBeInTheDocument();
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
      expect(screen.getByText(MI_COPY.badges.delayed.label)).toBeInTheDocument();
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
      expect(screen.getByText(MI_COPY.badges.stale.label)).toBeInTheDocument();
      expect(screen.getByText("$2,048.20")).toBeInTheDocument();
    });

    it("displays UNAVAILABLE instruments without quote board", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockResolvedValue({
        data: {
          instruments: [
            {
              symbol: "GC",
              name: "Gold Futures",
              delayClass: "UNAVAILABLE",
              quote: null,
            },
          ],
        },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(screen.getByText("GC")).toBeInTheDocument();
      });

      expect(screen.getByText("Gold Futures")).toBeInTheDocument();
      expect(screen.getByText(MI_COPY.badges.unavailable.label)).toBeInTheDocument();
      expect(screen.getByText(MI_COPY.states.quoteUnavailable)).toBeInTheDocument();
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
          screen.getByText(MI_COPY.states.noData),
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
          screen.getByText(MI_COPY.states.serviceUnavailable),
        ).toBeInTheDocument();
      });

      expect(screen.getByText(MI_COPY.actions.retry)).toBeInTheDocument();
    });

    it("shows generic error for non-5xx errors", async () => {
      localStorage.setItem("token", "fake-token");
      (api.markets.list as jest.Mock).mockRejectedValue({
        response: { status: 400 },
      });

      render(<IntelligencePage />);

      await waitFor(() => {
        expect(
          screen.getByText(MI_COPY.states.loadFailed),
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
        expect(screen.getByText(MI_COPY.disclaimer.title)).toBeInTheDocument();
      });

      expect(
        screen.getByText(new RegExp(MI_COPY.badges.delayed.description)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(MI_COPY.badges.stale.description)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(MI_COPY.badges.unavailable.description)),
      ).toBeInTheDocument();
    });
  });

  describe("string constants", () => {
    it("uses MI_COPY constants for all user-facing strings", () => {
      expect(MI_COPY.page.title).toBe("Market Intelligence");
      expect(MI_COPY.page.subtitle).toBe("Delayed XAU/GC market intelligence");
      expect(MI_COPY.badges.delayed.label).toBe("Delayed");
      expect(MI_COPY.badges.stale.label).toBe("Stale");
      expect(MI_COPY.badges.unavailable.label).toBe("Unavailable");
      expect(MI_COPY.requestAccess.title).toBe("Request Access");
      expect(MI_COPY.actions.refresh).toBe("Refresh");
      expect(MI_COPY.actions.retry).toBe("Retry");
    });
  });
});
