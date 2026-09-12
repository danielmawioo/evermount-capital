import { render, screen } from "@testing-library/react";
import WalletBalanceCards from "./WalletBalanceCards";

describe("WalletBalanceCards", () => {
  it("renders formatted wallet balances", () => {
    render(
      <WalletBalanceCards
        balance={{
          totalBalance: 1500,
          availableBalance: 1000,
          pendingBalance: 200,
          investedBalance: 300,
          currency: "USD",
        }}
      />,
    );

    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
    expect(screen.getByText("$1,500.00")).toBeInTheDocument();
    expect(screen.getByText("$300.00")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
  });
});
