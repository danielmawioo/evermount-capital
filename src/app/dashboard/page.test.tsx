import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import DashboardPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("DashboardPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    push.mockClear();
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("redirects to login when there is no stored auth token", () => {
    render(<DashboardPage />);

    expect(push).toHaveBeenCalledWith("/login");
  });

  it("renders the investor's greeting, balances, and quick actions once authenticated", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "a@b.com", fullName: "Jane Doe", role: "INVESTOR" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "Jane Doe",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
      subscription: null,
    });
    mock.onGet("/wallets/balance").reply(200, {
      availableBalance: 4000,
      investedBalance: 6000,
      totalBalance: 10000,
      currency: "USD",
    });
    mock.onGet("/portfolio/performance").reply(200, {
      equityCurve: [{ date: "2024-01-01", equity: 10000 }],
      metrics: {
        gainPercent: 5,
        absGain: 500,
        dailyPercent: 0.2,
        monthlyPercent: 1,
        maxDrawdown: -2,
        volatility: 1.5,
        sharpeRatio: 1.2,
        balance: 10000,
        equity: 10000,
      },
    });
    mock.onGet("/dashboard/stats").reply(200, { recentActivity: [] });

    render(<DashboardPage />);

    expect(await screen.findByText(/Jane/)).toBeInTheDocument();
    expect((await screen.findAllByText("$10,000.00")).length).toBeGreaterThan(
      0,
    );
    expect(await screen.findByText("Deposit")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalledWith("/login");
  });
});
