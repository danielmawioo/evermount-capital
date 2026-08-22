import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import AdminWithdrawalsPage from "./page";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

const WITHDRAWAL = {
  transactionId: "tx-1",
  userId: "user-1",
  userEmail: "investor@example.com",
  userName: "Jane Investor",
  amount: 500,
  fee: 5,
  currency: "USD",
  method: "bank",
  reference: null,
  description: null,
  createdAt: new Date(0).toISOString(),
};

describe("AdminWithdrawalsPage", () => {
  let mock: MockAdapter;
  let originalPrompt: typeof window.prompt;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
    originalPrompt = window.prompt;
  });

  afterEach(() => {
    mock.restore();
    window.prompt = originalPrompt;
  });

  it("renders the list of pending withdrawals", async () => {
    mock
      .onGet("/admin/wallets/withdrawals/pending")
      .reply(200, { withdrawals: [WITHDRAWAL], total: 1 });

    render(<AdminWithdrawalsPage />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );
    expect(screen.getByText("investor@example.com")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
  });

  it("shows an empty state when there are no pending withdrawals", async () => {
    mock
      .onGet("/admin/wallets/withdrawals/pending")
      .reply(200, { withdrawals: [], total: 0 });

    render(<AdminWithdrawalsPage />);

    await waitFor(() =>
      expect(screen.getByText("No pending withdrawals.")).toBeInTheDocument(),
    );
  });

  it("shows an error toast when loading fails", async () => {
    mock.onGet("/admin/wallets/withdrawals/pending").reply(500);

    render(<AdminWithdrawalsPage />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to load pending withdrawals",
      ),
    );
  });

  it("approves a withdrawal and reloads the list", async () => {
    mock
      .onGet("/admin/wallets/withdrawals/pending")
      .reply(200, { withdrawals: [WITHDRAWAL], total: 1 });
    mock.onPatch("/admin/wallets/withdrawals/tx-1/approve").reply(200, {});

    const user = userEvent.setup();
    render(<AdminWithdrawalsPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    mock.onGet("/admin/wallets/withdrawals/pending").reply(200, {
      withdrawals: [],
      total: 0,
    });

    await user.click(screen.getByRole("button", { name: /Approve/i }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Withdrawal approved"),
    );
    expect(
      mock.history.patch.some(
        (r) => r.url === "/admin/wallets/withdrawals/tx-1/approve",
      ),
    ).toBe(true);
  });

  it("rejects a withdrawal with a prompted reason", async () => {
    window.prompt = jest.fn(() => "Suspicious activity");
    mock
      .onGet("/admin/wallets/withdrawals/pending")
      .reply(200, { withdrawals: [WITHDRAWAL], total: 1 });
    mock.onPatch("/admin/wallets/withdrawals/tx-1/reject").reply(200, {});

    const user = userEvent.setup();
    render(<AdminWithdrawalsPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    mock.onGet("/admin/wallets/withdrawals/pending").reply(200, {
      withdrawals: [],
      total: 0,
    });

    await user.click(screen.getByRole("button", { name: /Reject/i }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        "Withdrawal rejected — funds returned to wallet",
      ),
    );
    const rejectCall = mock.history.patch.find(
      (r) => r.url === "/admin/wallets/withdrawals/tx-1/reject",
    );
    expect(JSON.parse(rejectCall?.data)).toEqual({
      reason: "Suspicious activity",
    });
  });

  it("shows an error toast when the reject call fails", async () => {
    window.prompt = jest.fn(() => null);
    mock
      .onGet("/admin/wallets/withdrawals/pending")
      .reply(200, { withdrawals: [WITHDRAWAL], total: 1 });
    mock.onPatch("/admin/wallets/withdrawals/tx-1/reject").reply(500);

    const user = userEvent.setup();
    render(<AdminWithdrawalsPage />);

    await waitFor(() =>
      expect(screen.getByText("Jane Investor")).toBeInTheDocument(),
    );

    await user.click(screen.getByRole("button", { name: /Reject/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to reject withdrawal"),
    );
    const rejectCall = mock.history.patch.find(
      (r) => r.url === "/admin/wallets/withdrawals/tx-1/reject",
    );
    expect(JSON.parse(rejectCall?.data)).toEqual({});
  });
});
