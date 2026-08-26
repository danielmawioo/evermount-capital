import { render, screen } from "@testing-library/react";
import MetricsAndCtaSection from "./MetricsAndCtaSection";

describe("MetricsAndCtaSection", () => {
  it("renders the performance metrics heading and all metrics", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("The Technology Behind Evermount"),
    ).toBeInTheDocument();

    expect(screen.getByText("Quantitative")).toBeInTheDocument();
    expect(screen.getByText("Research Engine")).toBeInTheDocument();
    expect(screen.getByText("Automated")).toBeInTheDocument();
    expect(screen.getByText("Execution Infrastructure")).toBeInTheDocument();
  });

  it("renders the call-to-action heading, copy, and buttons", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("Building the Future of African Financial Markets"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Schedule a Demo" }),
    ).toHaveAttribute("href", "/book-demo");
    expect(
      screen.getByRole("link", { name: "Get Started Free" }),
    ).toHaveAttribute("href", "/register");
  });
});
