import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import MpesaWithdrawPage from "./page";

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

describe("MpesaWithdrawPage", () => {
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

    render(<MpesaWithdrawPage />);

    expect(
      await screen.findByRole("heading", { name: "Verification Required" }),
    ).toBeInTheDocument();
  });

  it("rejects an amount below the KES 10 minimum", async () => {
    seedVerifiedInvestor(mock);
    const user = userEvent.setup();
    render(<MpesaWithdrawPage />);

    await screen.findByRole("heading", { name: "Withdraw to M-Pesa" });

    await user.type(screen.getByPlaceholderText("07XX XXX XXX"), "0712345678");
    await user.type(screen.getByPlaceholderText("Enter amount"), "5");
    await user.click(
      screen.getByRole("button", { name: "Withdraw to M-Pesa" }),
    );

    expect(mock.history.post).toHaveLength(0);
  });

  it("submits an M-Pesa withdrawal request", async () => {
    seedVerifiedInvestor(mock);
    mock.onPost("/withdrawals/mpesa").reply(200, {});

    const user = userEvent.setup();
    render(<MpesaWithdrawPage />);

    await screen.findByRole("heading", { name: "Withdraw to M-Pesa" });

    await user.type(screen.getByPlaceholderText("07XX XXX XXX"), "0712345678");
    await user.type(screen.getByPlaceholderText("Enter amount"), "500");
    await user.click(
      screen.getByRole("button", { name: "Withdraw to M-Pesa" }),
    );

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      amount: 500,
      currency: "KES",
      phoneNumber: "0712345678",
      reason: "Wallet withdrawal",
    });
  });
});
