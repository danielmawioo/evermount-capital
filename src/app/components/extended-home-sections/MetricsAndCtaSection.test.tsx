import { render, screen } from "@testing-library/react";
import MetricsAndCtaSection from "./MetricsAndCtaSection";

describe("MetricsAndCtaSection", () => {
  it("renders the performance metrics heading and all metrics", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("Performance Metrics & Track Record"),
    ).toBeInTheDocument();

    expect(screen.getByText("1.85+")).toBeInTheDocument();
    expect(screen.getByText("Information Ratio")).toBeInTheDocument();
    expect(screen.getByText("15%+")).toBeInTheDocument();
    expect(screen.getByText("Annualized Alpha")).toBeInTheDocument();
  });

  it("renders the call-to-action heading, copy, and buttons", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("Partner with a Systematic Investment Leader"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Schedule a Demo" }),
    ).toHaveAttribute("href", "/book-demo");
    expect(
      screen.getByRole("link", { name: "Get Started Free" }),
    ).toHaveAttribute("href", "/register");
  });
});
