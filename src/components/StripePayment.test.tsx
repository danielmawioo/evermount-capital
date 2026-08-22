import { render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import StripePayment from "./StripePayment";

jest.mock("@stripe/stripe-js", () => ({
  loadStripe: jest.fn().mockResolvedValue({}),
}));

jest.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stripe-elements">{children}</div>
  ),
  CardElement: () => <div data-testid="card-element" />,
  useStripe: () => ({ confirmCardPayment: jest.fn() }),
  useElements: () => ({ getElement: jest.fn() }),
}));

describe("StripePayment", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("shows a loading spinner while the payment intent is being created", async () => {
    mock.onPost("/deposits/card").reply(() => new Promise(() => {}));

    render(<StripePayment amount={100} onSuccess={jest.fn()} />);

    expect(screen.queryByTestId("stripe-elements")).not.toBeInTheDocument();
  });

  it("renders the card form and pay button once the client secret is ready", async () => {
    mock.onPost("/deposits/card").reply(200, { clientSecret: "cs_test_123" });

    render(<StripePayment amount={150.5} currency="USD" onSuccess={jest.fn()} />);

    expect(await screen.findByTestId("stripe-elements")).toBeInTheDocument();
    expect(screen.getByTestId("card-element")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pay USD 150.50" })
    ).toBeInTheDocument();
  });

  it("shows an error message when the payment intent cannot be initialized", async () => {
    mock.onPost("/deposits/card").reply(200, {});

    render(<StripePayment amount={50} onSuccess={jest.fn()} />);

    expect(
      await screen.findByText("Payment could not be initialized")
    ).toBeInTheDocument();
  });

  it("shows an error message when the create-intent request fails", async () => {
    mock.onPost("/deposits/card").reply(500, { error: { message: "Server exploded" } });

    render(<StripePayment amount={75} onSuccess={jest.fn()} />);

    expect(await screen.findByText("Server exploded")).toBeInTheDocument();
  });

  it("does not attempt to create a payment intent for a non-positive amount", () => {
    render(<StripePayment amount={0} onSuccess={jest.fn()} />);

    expect(mock.history.post?.length ?? 0).toBe(0);
  });
});
