import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import MpesaDepositPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("MpesaDepositPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    push.mockClear();
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the M-Pesa deposit form", () => {
    render(<MpesaDepositPage />);

    expect(
      screen.getByRole("heading", { name: "M-Pesa Deposit" })
    ).toBeInTheDocument();
  });

  it("rejects an amount below the KES 10 minimum without calling the API", async () => {
    const user = userEvent.setup();
    render(<MpesaDepositPage />);

    await user.type(screen.getByPlaceholderText("07XX XXX XXX"), "0712345678");
    await user.type(screen.getByPlaceholderText("1000"), "5");
    await user.click(screen.getByRole("button", { name: "Pay with M-Pesa" }));

    expect(mock.history.post).toHaveLength(0);
  });

  it("sends the STK push and shows the pending state", async () => {
    mock.onPost("/deposits/mpesa").reply(200, {
      depositId: "dep-1",
      customerMessage: "Check your phone",
    });

    const user = userEvent.setup();
    render(<MpesaDepositPage />);

    await user.type(screen.getByPlaceholderText("07XX XXX XXX"), "0712345678");
    await user.type(screen.getByPlaceholderText("1000"), "1000");
    await user.click(screen.getByRole("button", { name: "Pay with M-Pesa" }));

    await waitFor(() => expect(mock.history.post).toHaveLength(1));
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      amount: 1000,
      currency: "KES",
      phoneNumber: "0712345678",
    });

    expect(
      await screen.findByText("Waiting for M-Pesa confirmation...")
    ).toBeInTheDocument();
  });

  it("redirects to the wallet once M-Pesa confirms the deposit", async () => {
    jest.useFakeTimers({ advanceTimers: true });
    mock.onPost("/deposits/mpesa").reply(200, { depositId: "dep-1" });
    mock.onGet("/deposits/dep-1").reply(200, { status: "completed" });

    const user = userEvent.setup();
    render(<MpesaDepositPage />);

    await user.type(screen.getByPlaceholderText("07XX XXX XXX"), "0712345678");
    await user.type(screen.getByPlaceholderText("1000"), "1000");
    await user.click(screen.getByRole("button", { name: "Pay with M-Pesa" }));

    await waitFor(() => expect(mock.history.post).toHaveLength(1));

    await act(async () => {
      jest.advanceTimersByTime(6000);
    });

    await waitFor(() => expect(push).toHaveBeenCalledWith("/dashboard/wallets"));

    jest.useRealTimers();
  });
});
