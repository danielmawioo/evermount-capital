import { render, screen } from "@testing-library/react";
import DepositPage from "./page";

describe("DepositPage", () => {
  it("renders all deposit method options", () => {
    render(<DepositPage />);

    expect(
      screen.getByRole("heading", { name: "Deposit Funds" })
    ).toBeInTheDocument();
    expect(screen.getByText("Card Payment")).toBeInTheDocument();
    expect(screen.getByText("Crypto Payment")).toBeInTheDocument();
    expect(screen.getByText("M-Pesa")).toBeInTheDocument();
    expect(screen.getByText("Bank Transfer")).toBeInTheDocument();
  });

  it("links each method to its dedicated deposit page", () => {
    render(<DepositPage />);

    expect(screen.getByText("Card Payment").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/deposit/card"
    );
    expect(screen.getByText("Crypto Payment").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/deposit/crypto"
    );
    expect(screen.getByText("M-Pesa").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/deposit/mpesa"
    );
    expect(screen.getByText("Bank Transfer").closest("a")).toHaveAttribute(
      "href",
      "/dashboard/deposit/bank"
    );
  });
});
