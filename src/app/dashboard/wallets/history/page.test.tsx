import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import WalletHistoryPage from "./page";

describe("WalletHistoryPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the transaction table", async () => {
    mock.onGet("/wallets/history").reply(200, {
      transactions: [
        {
          id: "t1",
          type: "withdrawal",
          amount: 50,
          currency: "USD",
          status: "pending",
          createdAt: "2024-01-01T00:00:00.000Z",
        },
      ],
      total: 1,
    });

    render(<WalletHistoryPage />);

    expect(
      await screen.findByRole("heading", { name: "Transaction History" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Withdrawal")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Pending" })).toBeInTheDocument();
  });

  it("refetches with a type filter when changed", async () => {
    mock.onGet("/wallets/history").reply(200, { transactions: [], total: 0 });

    const user = userEvent.setup();
    render(<WalletHistoryPage />);

    await screen.findByText("No transactions found");

    const [typeSelect] = screen.getAllByRole("combobox");
    await user.selectOptions(typeSelect, "deposit");

    await waitFor(() => {
      const lastRequest = mock.history.get[mock.history.get.length - 1];
      expect(lastRequest.params).toMatchObject({ type: "deposit" });
    });
  });
});
