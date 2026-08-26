import { render, screen } from "@testing-library/react";
import ExtendedHomeSections from "./ExtendedHomeSections";

// Content-heavy marketing composition with no interactive logic - smoke test
// covering key headings, CTAs, and stats rather than deep interaction tests.
describe("ExtendedHomeSections", () => {
  it("renders without throwing and shows key section headings", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getByText("Quantitative Trading Technology Built for Africa"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Proprietary Technology & Research Infrastructure"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Systematic Investment Philosophy"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("World-Class Research & Engineering Team"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Institutional-Grade Infrastructure & Risk Controls"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Technology Behind Evermount"),
    ).toBeInTheDocument();
  });

  it("renders leadership team members", () => {
    render(<ExtendedHomeSections />);

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(
      screen.getByText("CEO, Co-Founder & Low-Latency Systems Engineer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Evans Kipngetich")).toBeInTheDocument();
  });

  it("renders the final CTA links to book-demo and register", () => {
    render(<ExtendedHomeSections />);

    expect(
      screen.getByRole("link", { name: "Schedule a Demo" }),
    ).toHaveAttribute("href", "/book-demo");
    expect(
      screen.getByRole("link", { name: "Get Started Free" }),
    ).toHaveAttribute("href", "/register");
  });

  it("renders capability metric cards", () => {
    render(<ExtendedHomeSections />);

    expect(screen.getByText("Quantitative")).toBeInTheDocument();
    expect(screen.getByText("Research Engine")).toBeInTheDocument();
  });
});
