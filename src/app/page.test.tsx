import { render, screen } from "@testing-library/react";
import Home, { metadata } from "./page";

describe("Home page", () => {
  it("renders without crashing and composes the main hero sections", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Building the Future of Investing/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/quantitative investment management firm/i).length,
    ).toBeGreaterThan(0);
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe(
      "Evermount Capital | AI-Powered Hedge Fund Platform",
    );
  });
});
