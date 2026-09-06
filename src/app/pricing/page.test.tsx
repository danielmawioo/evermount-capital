import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("PricingPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<PricingPage />);
    expect(
      screen.getByRole("heading", {
        name: /infrastructure pricing/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders access tiers without invented list prices", () => {
    render(<PricingPage />);
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Professional")).toBeInTheDocument();
    expect(screen.getByText("Institutional")).toBeInTheDocument();
    expect(screen.getByText("Enterprise")).toBeInTheDocument();
    expect(screen.queryByText("$10,000")).not.toBeInTheDocument();
  });
});
