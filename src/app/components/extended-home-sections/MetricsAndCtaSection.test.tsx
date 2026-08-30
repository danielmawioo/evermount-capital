import { render, screen } from "@testing-library/react";
import MetricsAndCtaSection from "./MetricsAndCtaSection";

describe("MetricsAndCtaSection", () => {
  it("renders the intelligence stack heading and all metrics", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("The Evermount Intelligence Stack"),
    ).toBeInTheDocument();

    expect(screen.getByText("AI Financial Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Quantitative Research")).toBeInTheDocument();
    expect(screen.getByText("Risk Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Intelligent Execution")).toBeInTheDocument();
  });

  it("renders the call-to-action heading, copy, and buttons", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("Building the Future of African Financial Markets"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore the Platform" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Partner With Evermount" }),
    ).toHaveAttribute("href", "/book-demo");
  });
});
