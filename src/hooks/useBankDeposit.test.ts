import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { formatSettlementText, useBankDeposit } from "./useBankDeposit";

describe("useBankDeposit", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("formats settlement copy without empty optional lines", () => {
    expect(
      formatSettlementText({
        bankName: "Equity",
        accountNumber: "123",
        swiftCode: "EQBLKENA",
      }),
    ).toBe("Bank: Equity\nAccount: 123\nSWIFT: EQBLKENA");
  });

  it("loads settlement details and bank accounts", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, {
      bankName: "Equity Bank Kenya",
      accountNumber: "0110166613478",
    });
    mock.onGet("/users/bank-accounts").reply(200, {
      accounts: [
        {
          id: "bank-1",
          bankName: "Chase",
          accountHolder: "Jane Doe",
          accountNumber: "1234567890",
          isDefault: true,
        },
      ],
    });

    const { result } = renderHook(() => useBankDeposit());
    await waitFor(() => expect(result.current.loadingData).toBe(false));
    expect(result.current.settlement?.bankName).toBe("Equity Bank Kenya");
    expect(result.current.selectedBankId).toBe("bank-1");
    expect(result.current.showAddForm).toBe(false);
  });

  it("opens the add-account form when no bank accounts exist", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, {
      bankName: "Equity Bank Kenya",
      accountNumber: "0110166613478",
    });
    mock.onGet("/users/bank-accounts").reply(200, { accounts: [] });

    const { result } = renderHook(() => useBankDeposit());
    await waitFor(() => expect(result.current.loadingData).toBe(false));
    expect(result.current.showAddForm).toBe(true);
  });
});
