import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import TradePage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

function seedVerifiedInvestor(mock: MockAdapter) {
  setAuthTokens("token", "refresh", true);
  setUser(
    { id: "1", email: "a@b.com", fullName: "A B", role: "INVESTOR" },
    true
  );
  mock.onGet("/users/profile").reply(200, {
    id: "1",
    email: "a@b.com",
    fullName: "A B",
    kycStatus: "VERIFIED",
    role: "INVESTOR",
    subscription: null,
  });
}

const PREVIEW = {
  investmentOptionId: "opt-1",
  programName: "Momentum Growth",
  strategyKey: "momentum",
  riskLevel: "MODERATE_RISK",
  lockInMonths: 6,
  lockInEndsAt: "2025-01-01T00:00:00.000Z",
  amount: 15000,
  allocationReason: "Matches your plan.",
  planType: "BASIC",
  minInvestment: 10000,
};

describe("TradePage", () => {
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

  it("prompts KYC verification when the investor is not verified", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "a@b.com", fullName: "A B", role: "INVESTOR" },
      true
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "PENDING",
      role: "INVESTOR",
    });
    mock.onGet("/wallets/balance").reply(200, { availableBalance: 0 });
    mock.onGet("/investments/preferences").reply(200, { lockInMonths: 6 });

    render(<TradePage />);

    expect(
      await screen.findByText("Complete verification to start trading")
    ).toBeInTheDocument();
  });

  it("walks a verified investor through preview and confirm to execute a trade", async () => {
    seedVerifiedInvestor(mock);
    mock.onGet("/wallets/balance").reply(200, { availableBalance: 20000 });
    mock.onGet("/investments/preferences").reply(200, { lockInMonths: 6 });
    mock.onPost("/investments/trade/preview").reply(200, PREVIEW);
    mock.onPost("/investments/trade").reply(200, {});

    const user = userEvent.setup();
    render(<TradePage />);

    expect(
      await screen.findByRole("heading", { name: "Trade" })
    ).toBeInTheDocument();
    expect(await screen.findByText("$20,000.00")).toBeInTheDocument();

    const amountInput = screen.getByRole("spinbutton");
    await user.type(amountInput, "15000");

    await user.click(screen.getByRole("button", { name: /Continue/ }));

    await waitFor(() => {
      expect(
        mock.history.post.some((r) => r.url === "/investments/trade/preview")
      ).toBe(true);
    });
    expect(
      JSON.parse(
        mock.history.post.find((r) => r.url === "/investments/trade/preview")!
          .data
      )
    ).toEqual({ amount: 15000, lockInMonths: 6 });

    expect(await screen.findByText("Momentum Growth")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Review & confirm/ }));

    expect(
      await screen.findByRole("checkbox")
    ).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button", { name: /Start trading/ }));

    await waitFor(() => {
      expect(
        mock.history.post.some((r) => r.url === "/investments/trade")
      ).toBe(true);
    });
    expect(push).toHaveBeenCalledWith("/dashboard/portfolio?traded=1");
  });

  it("blocks preview when the amount is below the plan minimum", async () => {
    seedVerifiedInvestor(mock);
    mock.onGet("/wallets/balance").reply(200, { availableBalance: 20000 });
    mock.onGet("/investments/preferences").reply(200, { lockInMonths: 6 });

    const user = userEvent.setup();
    render(<TradePage />);

    const amountInput = await screen.findByRole("spinbutton");
    await user.type(amountInput, "500");
    await user.click(screen.getByRole("button", { name: /Continue/ }));

    expect(
      mock.history.post.filter((r) => r.url === "/investments/trade/preview")
    ).toHaveLength(0);
  });
});
