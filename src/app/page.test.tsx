import { render, screen } from "@testing-library/react";
import Home, { metadata } from "./page";

describe("Home page", () => {
  it("renders without crashing and composes the main hero sections", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /We build intelligent financial systems/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/AI financial intelligence and trading/i).length,
    ).toBeGreaterThan(0);
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe(
      "Evermount | AI Financial Intelligence & Trading Infrastructure for Africa",
    );
  });
});
