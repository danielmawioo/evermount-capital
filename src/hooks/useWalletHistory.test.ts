import { renderHook, waitFor, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { useWalletHistory } from "./useWalletHistory";

describe("useWalletHistory", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads transactions and total from the wallets history API", async () => {
    mock.onGet("/wallets/history").reply(200, {
      transactions: [
        {
          id: "t1",
          type: "deposit",
          amount: 50,
          currency: "USD",
          status: "completed",
          createdAt: "2024-01-01T00:00:00.000Z",
        },
      ],
      total: 1,
    });

    const { result } = renderHook(() => useWalletHistory());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.pagination.total).toBe(1);
  });

  it("resets to page 1 and applies a type filter", async () => {
    mock.onGet("/wallets/history").reply(200, { transactions: [], total: 0 });

    const { result } = renderHook(() => useWalletHistory());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleFilterChange("type", "deposit");
    });

    await waitFor(() => {
      const last = mock.history.get[mock.history.get.length - 1];
      expect(last.params).toMatchObject({ type: "deposit", page: 1 });
    });
    expect(result.current.hasActiveFilters).toBe(true);
  });
});
