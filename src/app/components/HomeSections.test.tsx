import { render, screen } from "@testing-library/react";
import HomeSectionsWithImages from "./HomeSections";

describe("HomeSections", () => {
  it("renders without throwing and shows key section headings", () => {
    render(<HomeSectionsWithImages />);

    expect(
      screen.getByText("The Intelligence Infrastructure Behind Evermount"),
    ).toBeInTheDocument();
    expect(screen.getByText("What Evermount Builds")).toBeInTheDocument();
    expect(
      screen.getByText("From Financial Intelligence to Execution"),
    ).toBeInTheDocument();
    expect(screen.getByText("Evermount Platform")).toBeInTheDocument();
    expect(
      screen.getByText("How Evermount Turns Intelligence Into Action"),
    ).toBeInTheDocument();
  });

  it("renders the mid-page CTA links to platform and book-demo", () => {
    render(<HomeSectionsWithImages />);

    expect(
      screen.getByRole("link", { name: "Explore Evermount Technology" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Talk to Our Team" }),
    ).toHaveAttribute("href", "/book-demo");
  });

  it("renders the infrastructure categories", () => {
    render(<HomeSectionsWithImages />);

    expect(screen.getByText("Financial Data")).toBeInTheDocument();
    expect(screen.getByText("AI & Machine Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
  });
});
