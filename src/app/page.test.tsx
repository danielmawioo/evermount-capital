import { render, screen } from "@testing-library/react";
import Home, { metadata } from "./page";

describe("Home page", () => {
  it("renders without crashing and composes the main hero sections", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI Financial Intelligence & Trading Infrastructure for Africa/i,
      }),
    ).toBeInTheDocument();
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe(
      "Evermount | AI Financial Intelligence & Trading Infrastructure for Africa",
    );
  });
});
