import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import ManagerStrategiesPage from "./page";

const router = { push: jest.fn(), replace: jest.fn(), back: jest.fn() };

jest.mock("next/navigation", () => ({
  useRouter: () => router,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

const STRATEGY = {
  strategyKey: "momentum",
  displayName: "Momentum Alpha",
  lifecycleStatus: "LIVE",
  isActive: true,
  isPrimary: false,
  isRunning: false,
  executionPlane: "quant" as const,
  capitalAllocation: 0.5,
  poolAum: 100000,
  investorCount: 4,
  navPerUnit: 1.05,
  dailyReturnPct: 1.2,
  cumulativeReturnPct: 8.4,
  walkForwardScore: 0.9,
  productName: "Momentum Fund",
};

const COMBINED = {
  totalPoolAum: 200000,
  totalInvestors: 10,
  strategyCount: 2,
  activeCount: 1,
  primaryStrategy: "other-key",
  weightedDailyReturnPct: 0.8,
  weightedCumulativeReturnPct: 5.5,
  blendedNavPerUnit: 1.03,
  quantConnected: true,
  flipbotConnected: false,
  killSwitchActive: false,
  tradingMode: "paper",
};

describe("ManagerStrategiesPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "m@b.com", fullName: "M B", role: "MANAGER" },
      true
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "m@b.com",
      fullName: "M B",
      kycStatus: "VERIFIED",
      role: "MANAGER",
    });
  });

  afterEach(() => {
    mock.restore();
    localStorage.clear();
    sessionStorage.clear();
    jest.restoreAllMocks();
  });

  it("renders combined metrics and the strategy table once loaded", async () => {
    mock.onGet("/portfolio-manager/strategies").reply(200, {
      strategies: [STRATEGY],
      combined: COMBINED,
    });

    render(<ManagerStrategiesPage />);

    expect(await screen.findByText("Combined Portfolio Metrics")).toBeInTheDocument();
    expect(screen.getByText("Strategy Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Momentum Alpha")).toBeInTheDocument();
    expect(screen.getByText("momentum")).toBeInTheDocument();
    expect(screen.getByText("$200,000")).toBeInTheDocument();
  });

  it("shows the empty state when there are no strategies configured", async () => {
    mock.onGet("/portfolio-manager/strategies").reply(200, {
      strategies: [],
      combined: null,
    });

    render(<ManagerStrategiesPage />);

    expect(
      await screen.findByText("No strategies configured")
    ).toBeInTheDocument();
  });

  it("shows an error toast when loading strategies fails", async () => {
    const toastError = jest.spyOn(toast, "error");
    mock.onGet("/portfolio-manager/strategies").reply(500);

    render(<ManagerStrategiesPage />);

    await waitFor(() =>
      expect(toastError).toHaveBeenCalledWith("Failed to load strategies")
    );
  });

  it("switches the running strategy and posts to the switch endpoint", async () => {
    const user = userEvent.setup();
    const toastSuccess = jest.spyOn(toast, "success");
    mock.onGet("/portfolio-manager/strategies").reply(200, {
      strategies: [STRATEGY],
      combined: COMBINED,
    });
    mock
      .onPost("/portfolio-manager/strategies/momentum/switch")
      .reply(200, {
        strategies: [{ ...STRATEGY, isRunning: true, isPrimary: true }],
        combined: { ...COMBINED, primaryStrategy: "momentum" },
      });

    render(<ManagerStrategiesPage />);

    const runButton = await screen.findByRole("button", { name: /run/i });
    await user.click(runButton);

    await waitFor(() =>
      expect(
        mock.history.post?.some(
          (r) => r.url === "/portfolio-manager/strategies/momentum/switch"
        )
      ).toBe(true)
    );
    expect(toastSuccess).toHaveBeenCalledWith(
      "momentum is now the running strategy"
    );
    expect(await screen.findByText("Running")).toBeInTheDocument();
  });

  it("toggles strategy active state and posts the active flag", async () => {
    const user = userEvent.setup();
    const toastSuccess = jest.spyOn(toast, "success");
    mock.onGet("/portfolio-manager/strategies").reply(200, {
      strategies: [STRATEGY],
      combined: COMBINED,
    });
    mock
      .onPost("/portfolio-manager/strategies/momentum/active")
      .reply(200, {
        strategies: [{ ...STRATEGY, isActive: false }],
        combined: COMBINED,
      });

    render(<ManagerStrategiesPage />);

    const stopButton = await screen.findByRole("button", { name: /stop/i });
    await user.click(stopButton);

    await waitFor(() => {
      const call = mock.history.post?.find(
        (r) => r.url === "/portfolio-manager/strategies/momentum/active"
      );
      expect(call).toBeDefined();
      expect(JSON.parse(call!.data)).toEqual({ active: false });
    });
    expect(toastSuccess).toHaveBeenCalledWith("Strategy deactivated");
  });
});
