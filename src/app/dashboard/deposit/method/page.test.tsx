import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DepositMethodPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("DepositMethodPage", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("renders the deposit method chooser", () => {
    render(<DepositMethodPage />);

    expect(
      screen.getByRole("heading", { name: "Choose Deposit Method" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Card")).toBeInTheDocument();
    expect(screen.getByText("M-Pesa")).toBeInTheDocument();
  });

  it("navigates to the crypto deposit page when crypto is selected", async () => {
    const user = userEvent.setup();
    render(<DepositMethodPage />);

    await user.click(screen.getByText("Crypto"));

    expect(push).toHaveBeenCalledWith("/dashboard/deposit/crypto");
  });
});
