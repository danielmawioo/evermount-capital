import { render, screen } from "@testing-library/react";
import FinalCtaSection from "./FinalCtaSection";

describe("FinalCtaSection", () => {
  it("renders the headline and subtitle copy", () => {
    render(<FinalCtaSection />);

    expect(
      screen.getByText(/Financial Infrastructure for/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Financial markets are complex, fragmented/),
    ).toBeInTheDocument();
  });

  it("renders the CTA buttons linking to the right pages", () => {
    render(<FinalCtaSection />);

    expect(
      screen.getByRole("link", { name: "Explore Platform" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Request Access" }),
    ).toHaveAttribute("href", "/book-demo");
  });
});
