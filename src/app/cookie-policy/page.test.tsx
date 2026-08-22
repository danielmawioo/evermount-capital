import { render, screen } from "@testing-library/react";
import CookiePolicyPage from "./page";

describe("CookiePolicyPage", () => {
  it("renders the cookie policy content", () => {
    render(<CookiePolicyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Cookie Policy/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Effective Date:/i)).toBeInTheDocument();
  });
});
