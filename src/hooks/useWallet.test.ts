import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { useWallet } from "./useWallet";

describe("useWallet", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads balance and recent transactions", async () => {
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

    const { result } = renderHook(() => useWallet());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.balance?.availableBalance).toBe(1000);
    expect(result.current.transactions).toHaveLength(1);
  });

  it("falls back to a zeroed balance when the request fails", async () => {
    mock.onGet("/wallets/balance").reply(500);
    mock.onGet("/wallets/history").reply(200, { transactions: [] });

    const { result } = renderHook(() => useWallet());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.balance?.availableBalance).toBe(0);
  });
});
