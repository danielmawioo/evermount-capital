import { render, screen } from "@testing-library/react";
import TermsPage from "./page";

describe("TermsPage", () => {
  it("renders the terms and conditions content", () => {
    render(<TermsPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Platform Services Agreement/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
  });
});
