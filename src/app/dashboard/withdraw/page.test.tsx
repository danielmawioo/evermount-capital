import { render, screen } from "@testing-library/react";
import WithdrawPage from "./page";

describe("WithdrawPage", () => {
  it("renders withdrawal method options", () => {
    render(<WithdrawPage />);

    expect(
      screen.getByRole("heading", { name: "Withdraw Funds" })
    ).toBeInTheDocument();
  });
});
