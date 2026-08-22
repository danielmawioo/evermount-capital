import { render, screen } from "@testing-library/react";
import InvestorTourPage from "./page";

describe("InvestorTourPage", () => {
  it("renders without crashing and shows the main heading", () => {
    render(<InvestorTourPage />);
    expect(
      screen.getByRole("heading", { name: /a smarter way to invest/i }),
    ).toBeInTheDocument();
  });

  it("renders the how-it-works and roadmap sections", () => {
    render(<InvestorTourPage />);
    expect(
      screen.getByRole("heading", { name: /how it works/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /investor journey roadmap/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /performance snapshot/i }),
    ).toBeInTheDocument();
  });

  it("links the hero and final CTA buttons to the correct destinations", () => {
    render(<InvestorTourPage />);
    const bookDemoLinks = screen.getAllByRole("link", { name: /book a demo/i });
    expect(bookDemoLinks.length).toBeGreaterThan(0);
    bookDemoLinks.forEach((link) =>
      expect(link).toHaveAttribute("href", "/book-demo"),
    );

    const waitlistLinks = screen.getAllByRole("link", {
      name: /(get early access|join the waitlist)/i,
    });
    expect(waitlistLinks.length).toBeGreaterThan(0);
    waitlistLinks.forEach((link) =>
      expect(link).toHaveAttribute("href", "/waitlist"),
    );
  });
});
