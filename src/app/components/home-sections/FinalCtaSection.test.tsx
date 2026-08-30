import { render, screen } from "@testing-library/react";
import FinalCtaSection from "./FinalCtaSection";

describe("FinalCtaSection", () => {
  it("renders the headline and subtitle copy", () => {
    render(<FinalCtaSection />);

    expect(
      screen.getByText(/The Intelligence Layer for/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Africa's financial markets are fragmented/),
    ).toBeInTheDocument();
  });

  it("renders the CTA buttons linking to the right pages", () => {
    render(<FinalCtaSection />);

    expect(
      screen.getByRole("link", { name: "Explore Evermount Technology" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Talk to Our Team" }),
    ).toHaveAttribute("href", "/book-demo");
  });
});
