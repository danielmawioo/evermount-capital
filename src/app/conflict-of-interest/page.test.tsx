import { render, screen } from "@testing-library/react";
import ConflictOfInterestPage, { metadata } from "./page";

describe("ConflictOfInterestPage", () => {
  it("renders the conflict of interest policy content", () => {
    render(<ConflictOfInterestPage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Conflict of Interest Policy/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Last updated:/i)).toBeInTheDocument();
  });

  it("exports metadata with the expected title", () => {
    expect(metadata.title).toBe(
      "Conflict of Interest Policy | Evermount Capital",
    );
  });
});
