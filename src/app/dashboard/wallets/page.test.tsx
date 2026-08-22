import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import WalletsPage from "./page";

describe("WalletsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders wallet balances and recent transactions", async () => {
    mock.onGet("/wallets/balance").reply(200, {
      totalBalance: 1500,
      availableBalance: 1000,
      pendingBalance: 200,
      investedBalance: 300,
      currency: "USD",
    });
    mock.onGet("/wallets/history").reply(200, {
      transactions: [
        {
          id: "t1",
          type: "deposit",
          amount: 100,
          currency: "USD",
          status: "completed",
          createdAt: "2024-01-01T00:00:00.000Z",
        },
      ],
    });

    render(<WalletsPage />);

    expect(
      await screen.findByRole("heading", { name: "Wallet & Escrow" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("$1,500.00")).toBeInTheDocument();
    expect(await screen.findByText("+$100.00")).toBeInTheDocument();
  });

  it("falls back to zeroed balances when the balance request fails", async () => {
    mock.onGet("/wallets/balance").reply(500);
    mock.onGet("/wallets/history").reply(200, { transactions: [] });

    render(<WalletsPage />);

    expect(await screen.findAllByText("$0.00")).not.toHaveLength(0);
    expect(await screen.findByText("No transactions yet")).toBeInTheDocument();
  });
});
