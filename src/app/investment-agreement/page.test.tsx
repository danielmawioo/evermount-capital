import { render, screen } from "@testing-library/react";
import InvestmentAgreementPage, { metadata } from "./page";

describe("InvestmentAgreementPage", () => {
  it("renders the investment agreement content", () => {
    render(<InvestmentAgreementPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Investment Agreement/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe("Investment Agreement | Evermount Capital");
  });
});
