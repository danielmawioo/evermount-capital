import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import PaymentMethodsPage from "./PaymentMethodsPage";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("PaymentMethodsPage", () => {
  beforeEach(() => {
    push.mockClear();
    (toast as unknown as jest.Mock).mockClear();
  });

  it("renders deposit method options with card and m-pesa available", () => {
    render(<PaymentMethodsPage type="deposit" />);

    expect(
      screen.getByRole("heading", { name: "Choose Deposit Method" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Card")).toBeInTheDocument();
    expect(screen.getByText("M-Pesa")).toBeInTheDocument();
    expect(screen.getByText("Bank")).toBeInTheDocument();
    expect(screen.getByText("Crypto")).toBeInTheDocument();
  });

  it("renders withdraw method options with the withdraw heading", () => {
    render(<PaymentMethodsPage type="withdraw" />);

    expect(
      screen.getByRole("heading", { name: "Choose Withdrawal Method" }),
    ).toBeInTheDocument();
  });

  it("navigates to the method route when an available method is selected", async () => {
    const user = userEvent.setup();
    render(<PaymentMethodsPage type="deposit" />);

    await user.click(screen.getByText("Card"));

    expect(push).toHaveBeenCalledWith("/dashboard/deposit/card");
  });

  it("shows a coming-soon toast instead of navigating for an unavailable method", async () => {
    const user = userEvent.setup();
    render(<PaymentMethodsPage type="deposit" />);

    await user.click(screen.getByText("Bank"));

    expect(toast).toHaveBeenCalledWith(
      "This payment method is coming soon.",
      expect.objectContaining({ icon: "ℹ️" }),
    );
    expect(push).not.toHaveBeenCalled();
  });
});
