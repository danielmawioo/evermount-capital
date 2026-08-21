import { render, screen } from "@testing-library/react";
import BestExecutionPage, { metadata } from "./page";

describe("BestExecutionPage", () => {
  it("renders the best execution policy content", () => {
    render(<BestExecutionPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Best Execution Policy/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe("Best Execution Policy | Evermount Capital");
  });
});
