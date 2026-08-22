import { render, screen } from "@testing-library/react";
import AMLPolicyPage from "./page";

describe("AMLPolicyPage", () => {
  it("renders the AML policy content", () => {
    render(<AMLPolicyPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Anti-Money Laundering \(AML\) Policy/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Effective Date:/i)).toBeInTheDocument();
  });
});
