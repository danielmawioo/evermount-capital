import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import CardDepositPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// StripePayment pulls in @stripe/stripe-js which tries to inject a script tag
// and talk to js.stripe.com; it is a self-contained child component, so stub
// it out to keep this test focused on CardDepositPage's own form logic.
jest.mock("@/components/StripePayment", () => {
  return function MockStripePayment() {
    return <div>Mock Stripe Payment</div>;
  };
});

describe("CardDepositPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the deposit form with the settlement account", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, {
      bankName: "Test Bank",
      accountNumber: "999888777",
    });

    render(<CardDepositPage />);

    expect(
      screen.getByRole("heading", { name: "Card Deposit" }),
    ).toBeInTheDocument();
    expect((await screen.findAllByText(/Test Bank/)).length).toBeGreaterThan(0);
  });

  it("rejects an amount below the $10 minimum", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, {});
    const user = userEvent.setup();
    render(<CardDepositPage />);

    await user.type(screen.getByPlaceholderText("100.00"), "5");
    await user.click(
      screen.getByRole("button", { name: "Continue to Payment" }),
    );

    expect(
      screen.queryByRole("heading", { name: "Complete Payment" }),
    ).not.toBeInTheDocument();
  });

  it("proceeds to the payment step for a valid amount", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, {});
    const user = userEvent.setup();
    render(<CardDepositPage />);

    await user.type(screen.getByPlaceholderText("100.00"), "100");
    await user.click(
      screen.getByRole("button", { name: "Continue to Payment" }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Complete Payment" }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Mock Stripe Payment")).toBeInTheDocument();
  });
});
