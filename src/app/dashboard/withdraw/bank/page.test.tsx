import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import WithdrawBankPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

const BANK_ACCOUNT = {
  id: "bank-1",
  bankName: "Chase",
  accountHolder: "Jane Doe",
  accountNumber: "1234567890",
  isDefault: true,
};

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
  });
}

describe("WithdrawBankPage", () => {
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
      true
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      kycStatus: "PENDING",
      role: "INVESTOR",
    });

    render(<WithdrawBankPage />);

    expect(
      await screen.findByRole("heading", { name: "Verification Required" })
    ).toBeInTheDocument();
  });

  it("loads bank accounts and submits a withdrawal for a verified investor", async () => {
    seedVerifiedInvestor(mock);
    mock.onGet("/users/bank-accounts").reply(200, { accounts: [BANK_ACCOUNT] });
    mock.onPost("/withdrawals/bank").reply(200, {});

    const user = userEvent.setup();
    render(<WithdrawBankPage />);

    expect(
      await screen.findByRole("heading", { name: "Withdraw to Bank" })
    ).toBeInTheDocument();
    expect(await screen.findByText(/Chase/)).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Enter amount"), "200");
    await user.click(
      screen.getByRole("button", { name: "Submit Withdrawal Request" })
    );

    await waitFor(() => {
      expect(
        mock.history.post.some((r) => r.url === "/withdrawals/bank")
      ).toBe(true);
    });
    const call = mock.history.post.find((r) => r.url === "/withdrawals/bank");
    expect(JSON.parse(call!.data)).toEqual({
      amount: 200,
      currency: "USD",
      bankAccountId: "bank-1",
      reason: "Personal withdrawal",
    });
  });

  it("shows the add-account form when there are no bank accounts yet", async () => {
    seedVerifiedInvestor(mock);
    mock.onGet("/users/bank-accounts").reply(200, { accounts: [] });

    render(<WithdrawBankPage />);

    expect(await screen.findByText("Add Bank Account")).toBeInTheDocument();
    expect(
      screen.getByText("Add a bank account above to continue.")
    ).toBeInTheDocument();
  });
});
