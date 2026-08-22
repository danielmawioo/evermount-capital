import { render, screen } from "@testing-library/react";
import HomeSectionsWithImages from "./HomeSections";

// Content-heavy marketing composition with no interactive logic (tabs,
// forms, accordions) - a smoke test covering key headings and CTAs is
// appropriate here rather than deep interaction tests.
describe("HomeSections", () => {
  it("renders without throwing and shows key section headings", () => {
    render(<HomeSectionsWithImages />);

    expect(
      screen.getByText("Our Numbers Speak For Themselves"),
    ).toBeInTheDocument();
    expect(screen.getByText("Key Highlights")).toBeInTheDocument();
    expect(
      screen.getByText("Systematic Investment Excellence"),
    ).toBeInTheDocument();
    expect(screen.getByText("Fund Highlights")).toBeInTheDocument();
    expect(screen.getByText("How We Manage Your Capital")).toBeInTheDocument();
  });

  it("renders the final CTA links to book-demo and portfolio-insights", () => {
    render(<HomeSectionsWithImages />);

    expect(screen.getByRole("link", { name: "Book a Demo" })).toHaveAttribute(
      "href",
      "/book-demo",
    );
    expect(
      screen.getByRole("link", { name: "See Performance" }),
    ).toHaveAttribute("href", "/portfolio-insights");
  });

  it("renders the key stats", () => {
    render(<HomeSectionsWithImages />);

    expect(screen.getByText("82")).toBeInTheDocument();
    expect(screen.getByText("Investor Partners")).toBeInTheDocument();
    expect(screen.getByText("18.5%")).toBeInTheDocument();
  });
});
