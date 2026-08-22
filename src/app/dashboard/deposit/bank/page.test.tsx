import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import BankDepositPage from "./page";

const SETTLEMENT = {
  bankName: "Equity Bank Kenya",
  accountNumber: "0110166613478",
  branch: "Kenya",
  swiftCode: "EQBLKENA",
};

const BANK_ACCOUNT = {
  id: "bank-1",
  bankName: "Chase",
  accountHolder: "Jane Doe",
  accountNumber: "1234567890",
  isDefault: true,
};

describe("BankDepositPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads settlement details and existing bank accounts", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, SETTLEMENT);
    mock.onGet("/users/bank-accounts").reply(200, { accounts: [BANK_ACCOUNT] });

    render(<BankDepositPage />);

    expect(
      await screen.findByRole("heading", { name: "Bank Transfer" })
    ).toBeInTheDocument();
    expect(await screen.findByText(/Chase/)).toBeInTheDocument();
    expect(screen.getByText(/Equity Bank Kenya/)).toBeInTheDocument();
  });

  it("shows the add-account form automatically when there are no bank accounts", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, SETTLEMENT);
    mock.onGet("/users/bank-accounts").reply(200, { accounts: [] });

    render(<BankDepositPage />);

    expect(
      await screen.findByPlaceholderText("Bank name")
    ).toBeInTheDocument();
    expect(screen.getByText("Add your bank account to continue.")).toBeInTheDocument();
  });

  it("submits a bank deposit with the selected account and amount", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, SETTLEMENT);
    mock.onGet("/users/bank-accounts").reply(200, { accounts: [BANK_ACCOUNT] });
    mock.onPost("/deposits/bank").reply(200, {
      depositId: "dep-1",
      reference: "REF123",
      amount: 500,
      status: "pending",
      bankDetails: SETTLEMENT,
    });

    const user = userEvent.setup();
    render(<BankDepositPage />);

    await screen.findByText(/Chase/);

    const amountInput = screen.getByRole("spinbutton");
    await user.type(amountInput, "500");

    await user.click(
      screen.getByRole("button", { name: "Initiate Bank Deposit" })
    );

    await waitFor(() => {
      expect(mock.history.post).toHaveLength(1);
    });
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      amount: 500,
      currency: "USD",
      bankAccountId: "bank-1",
      reference: undefined,
    });

    expect(await screen.findByText("Deposit initiated")).toBeInTheDocument();
    expect(screen.getByText(/REF123/)).toBeInTheDocument();
  });

  it("adds a new bank account", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, SETTLEMENT);
    mock
      .onGet("/users/bank-accounts")
      .replyOnce(200, { accounts: [] })
      .onGet("/users/bank-accounts")
      .reply(200, { accounts: [BANK_ACCOUNT] });
    mock.onPost("/users/bank-accounts").reply(200, { account: BANK_ACCOUNT });

    const user = userEvent.setup();
    render(<BankDepositPage />);

    await screen.findByPlaceholderText("Bank name");

    await user.type(screen.getByPlaceholderText("Bank name"), "Chase");
    await user.type(screen.getByPlaceholderText("Account holder name"), "Jane Doe");
    await user.type(screen.getByPlaceholderText("Account number"), "1234567890");

    await user.click(screen.getByRole("button", { name: "Save bank account" }));

    await waitFor(() => {
      expect(mock.history.post.some((r) => r.url === "/users/bank-accounts")).toBe(
        true
      );
    });
  });
});
