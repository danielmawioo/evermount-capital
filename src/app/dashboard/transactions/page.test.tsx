import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import TransactionsPage from "./page";

describe("TransactionsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the transactions table", async () => {
    mock.onGet("/wallets/history").reply(200, {
      transactions: [
        {
          id: "t1",
          type: "deposit",
          amount: 250,
          currency: "USD",
          status: "success",
          createdAt: "2024-02-01T00:00:00.000Z",
        },
      ],
      total: 1,
    });

    render(<TransactionsPage />);

    expect(
      screen.getByRole("heading", { name: "Transaction History" })
    ).toBeInTheDocument();
    expect(await screen.findByText("deposit")).toBeInTheDocument();
    expect(screen.getByText("$250.00")).toBeInTheDocument();
  });

  it("shows an empty state when there are no transactions", async () => {
    mock.onGet("/wallets/history").reply(200, { transactions: [], total: 0 });

    render(<TransactionsPage />);

    expect(
      await screen.findByText(
        "No transactions yet. Make a deposit or investment to get started."
      )
    ).toBeInTheDocument();
  });

  it("paginates to the next page when there are more results", async () => {
    mock.onGet("/wallets/history").reply((config) => {
      const page = config.params?.page ?? 1;
      return [
        200,
        {
          transactions: [
            {
              id: `t-${page}`,
              type: "withdrawal",
              amount: 10,
              currency: "USD",
              status: "pending",
              createdAt: "2024-02-01T00:00:00.000Z",
            },
          ],
          total: 50,
        },
      ];
    });

    const user = userEvent.setup();
    render(<TransactionsPage />);

    await screen.findByText("withdrawal");
    await user.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      const lastRequest = mock.history.get[mock.history.get.length - 1];
      expect(lastRequest.params).toMatchObject({ page: 2 });
    });
  });
});
