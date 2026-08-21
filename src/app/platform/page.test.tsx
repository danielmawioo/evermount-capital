import { render, screen } from "@testing-library/react";
import PlatformPage from "./page";

describe("PlatformPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<PlatformPage />);
    expect(
      screen.getByRole("heading", { name: /the platform/i })
    ).toBeInTheDocument();
  });

  it("renders all platform feature cards", () => {
    render(<PlatformPage />);
    expect(
      screen.getByRole("heading", { name: /ai-powered execution/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /real-time analytics/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /enterprise security/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /high-frequency trading/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /global market access/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /risk management/i })
    ).toBeInTheDocument();
  });
});
