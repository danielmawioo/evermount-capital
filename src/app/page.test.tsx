import { render, screen } from "@testing-library/react";
import Home, { metadata } from "./page";

describe("Home page", () => {
  it("renders without crashing and composes the main hero sections", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Building Africa's Quantitative Trading Infrastructure/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/quantitative trading and market-making/i).length,
    ).toBeGreaterThan(0);
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe(
      "Evermount Capital | Quantitative Trading Infrastructure for Africa",
    );
  });
});
