import { render, screen } from "@testing-library/react";
import FinalCtaSection from "./FinalCtaSection";

describe("FinalCtaSection", () => {
  it("renders the headline and subtitle copy", () => {
    render(<FinalCtaSection />);

    expect(screen.getByText("African markets")).toBeInTheDocument();
    expect(screen.getByText("starts here.")).toBeInTheDocument();
    expect(
      screen.getByText(/Evermount is building the quantitative research/),
    ).toBeInTheDocument();
  });

  it("renders the CTA buttons linking to the right pages", () => {
    render(<FinalCtaSection />);

    expect(screen.getByRole("link", { name: "Book a Demo" })).toHaveAttribute(
      "href",
      "/book-demo",
    );
    expect(
      screen.getByRole("link", { name: "See Performance" }),
    ).toHaveAttribute("href", "/portfolio-insights");
  });
});
