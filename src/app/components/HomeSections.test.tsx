import { render, screen } from "@testing-library/react";
import HomeSectionsWithImages from "./HomeSections";

describe("HomeSections", () => {
  it("renders without throwing and shows key section headings", () => {
    render(<HomeSectionsWithImages />);

    expect(
      screen.getByText("The Infrastructure Behind Modern Markets"),
    ).toBeInTheDocument();
    expect(screen.getByText("What Evermount Builds")).toBeInTheDocument();
    expect(
      screen.getByText("From Financial Intelligence to Execution"),
    ).toBeInTheDocument();
    expect(screen.getByText("Evermount Platform")).toBeInTheDocument();
    expect(screen.getByText("Markets")).toBeInTheDocument();
  });

  it("renders the mid-page CTA links to platform and book-demo", () => {
    render(<HomeSectionsWithImages />);

    expect(
      screen.getByRole("link", { name: "Explore Platform" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Request Access" }),
    ).toHaveAttribute("href", "/book-demo");
  });

  it("renders the infrastructure categories", () => {
    render(<HomeSectionsWithImages />);

    expect(screen.getAllByText("Market Data").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AI & Intelligence").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Quantitative Research").length).toBeGreaterThan(
      0,
    );
  });
});
