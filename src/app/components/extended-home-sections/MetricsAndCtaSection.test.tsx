import { render, screen } from "@testing-library/react";
import MetricsAndCtaSection from "./MetricsAndCtaSection";

describe("MetricsAndCtaSection", () => {
  it("renders the call-to-action heading, copy, and buttons", () => {
    render(<MetricsAndCtaSection />);

    expect(
      screen.getByText("Building AI Financial Intelligence for Africa"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore Platform" }),
    ).toHaveAttribute("href", "/platform");
    expect(
      screen.getByRole("link", { name: "Become a Partner" }),
    ).toHaveAttribute("href", "/partners");
  });
});
