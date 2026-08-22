import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WithdrawMethodPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("WithdrawMethodPage", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("renders the withdrawal method chooser", () => {
    render(<WithdrawMethodPage />);

    expect(
      screen.getByRole("heading", { name: "Choose Withdrawal Method" }),
    ).toBeInTheDocument();
  });

  it("navigates to the bank withdrawal page when bank is selected", async () => {
    const user = userEvent.setup();
    render(<WithdrawMethodPage />);

    await user.click(screen.getByText("Bank"));

    expect(push).toHaveBeenCalledWith("/dashboard/withdraw/bank");
  });
});
