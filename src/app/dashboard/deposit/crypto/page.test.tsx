import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import CryptoDepositPage from "./page";

describe("CryptoDepositPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the crypto deposit form", () => {
    render(<CryptoDepositPage />);

    expect(
      screen.getByRole("heading", { name: "Crypto Deposit" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Generate Deposit Address" }),
    ).toBeInTheDocument();
  });

  it("generates a deposit address and shows it for copying", async () => {
    mock.onPost("/deposits/crypto").reply(200, {
      depositAddress: "bc1qxyz",
      qrCode: null,
    });

    const user = userEvent.setup();
    render(<CryptoDepositPage />);

    await user.type(screen.getByPlaceholderText("0.00"), "0.01");
    await user.click(
      screen.getByRole("button", { name: "Generate Deposit Address" }),
    );

    await waitFor(() => {
      expect(mock.history.post).toHaveLength(1);
    });
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      amount: 0.01,
      currency: "BTC",
      walletAddress: "user_wallet",
    });

    expect(await screen.findByText("bc1qxyz")).toBeInTheDocument();

    const writeTextSpy = jest
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);

    await user.click(
      screen.getByRole("button", { name: /Copy Wallet Address/ }),
    );
    expect(writeTextSpy).toHaveBeenCalledWith("bc1qxyz");
  });

  it("shows an error toast when the deposit amount is invalid", async () => {
    const user = userEvent.setup();
    render(<CryptoDepositPage />);

    const amountInput = screen.getByPlaceholderText("0.00");
    await user.type(amountInput, "0");
    await user.click(
      screen.getByRole("button", { name: "Generate Deposit Address" }),
    );

    expect(mock.history.post).toHaveLength(0);
  });
});
