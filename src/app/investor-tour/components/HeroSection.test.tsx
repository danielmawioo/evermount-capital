import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the heading, body copy and both call-to-action links", () => {
    render(<HeroSection />);

    expect(screen.getByText("A Smarter Way to Invest")).toBeInTheDocument();
    expect(
      screen.getByText(/Explore how Evermount blends AI and Quantitative Models/),
    ).toBeInTheDocument();

    const bookDemoLink = screen.getByRole("link", { name: "Book a Demo" });
    expect(bookDemoLink).toHaveAttribute("href", "/book-demo");

    const waitlistLink = screen.getByRole("link", {
      name: "Get Early Access",
    });
    expect(waitlistLink).toHaveAttribute("href", "/waitlist");
  });
});
