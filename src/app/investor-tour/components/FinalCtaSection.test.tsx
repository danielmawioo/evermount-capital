import { render, screen } from "@testing-library/react";
import FinalCtaSection from "./FinalCtaSection";

describe("FinalCtaSection", () => {
  it("renders the heading, body copy and both call-to-action links", () => {
    render(<FinalCtaSection />);

    expect(
      screen.getByText("Ready to Experience the Future of Investing?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Join institutional and accredited investors/),
    ).toBeInTheDocument();

    const bookDemoLink = screen.getByRole("link", { name: "Book a Demo" });
    expect(bookDemoLink).toHaveAttribute("href", "/book-demo");

    const waitlistLink = screen.getByRole("link", {
      name: "Join the Waitlist",
    });
    expect(waitlistLink).toHaveAttribute("href", "/waitlist");
  });
});
