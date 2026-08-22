import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import WithdrawCryptoPage from "./page";

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
    true,
  );
  mock.onGet("/users/profile").reply(200, {
    id: "1",
    email: "a@b.com",
    fullName: "A B",
    kycStatus: "VERIFIED",
    role: "INVESTOR",
  });
}

describe("WithdrawCryptoPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("shows the KYC gate when the investor is not verified", async () => {
    setAuthTokens("token", "refresh", true);
    setUser(
      { id: "1", email: "a@b.com", fullName: "A B", role: "INVESTOR" },
      true,
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "PENDING",
      role: "INVESTOR",
    });

    render(<WithdrawCryptoPage />);

    expect(
      await screen.findByRole("heading", { name: "Verification Required" }),
    ).toBeInTheDocument();
  });

  it("submits a crypto withdrawal and redirects to wallets", async () => {
    seedVerifiedInvestor(mock);
    mock.onPost("/withdrawals/crypto").reply(200, {});

    const user = userEvent.setup();
    render(<WithdrawCryptoPage />);

    expect(
      await screen.findByRole("heading", { name: "Withdraw to Crypto" }),
    ).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox"), "Ethereum");
    await user.type(
      screen.getByPlaceholderText("Paste your wallet address"),
      "0xabc123",
    );
    await user.type(screen.getByPlaceholderText("Enter amount"), "50");

    await user.click(
      screen.getByRole("button", { name: "Withdraw to Crypto" }),
    );

    await waitFor(() => {
      expect(mock.history.post).toHaveLength(1);
    });
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      amount: 50,
      currency: "ETH",
      walletAddress: "0xabc123",
      network: "ethereum",
    });
  });
});
