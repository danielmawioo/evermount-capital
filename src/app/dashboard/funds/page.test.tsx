import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FundsPage from "./page";

describe("FundsPage", () => {
  it("renders the fund summary and each fund card", () => {
    render(<FundsPage />);

    expect(
      screen.getByRole("heading", { name: /My Funds/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Global Equity Fund")).toBeInTheDocument();
    expect(screen.getByText("Forex Trading Fund")).toBeInTheDocument();
    expect(screen.getByText("Total Invested")).toBeInTheDocument();
  });

  it("filters funds by search term", async () => {
    const user = userEvent.setup();
    render(<FundsPage />);

    await user.type(
      screen.getByPlaceholderText("Search funds..."),
      "Crypto"
    );

    expect(screen.getByText("Crypto Growth Fund")).toBeInTheDocument();
    expect(screen.queryByText("Global Equity Fund")).not.toBeInTheDocument();
  });

  it("shows an empty state when no funds match the filters", async () => {
    const user = userEvent.setup();
    render(<FundsPage />);

    await user.type(
      screen.getByPlaceholderText("Search funds..."),
      "nonexistent fund"
    );

    expect(
      screen.getByText("No funds found matching your criteria.")
    ).toBeInTheDocument();
  });
});
