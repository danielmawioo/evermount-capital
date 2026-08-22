import { render, screen } from "@testing-library/react";
import WhyChooseUsAndClosingSection from "./WhyChooseUsAndClosingSection";

describe("WhyChooseUsAndClosingSection", () => {
  it("renders the why choose us heading and items", () => {
    render(<WhyChooseUsAndClosingSection />);

    expect(
      screen.getByRole("heading", { name: "Why Choose Evermount Capital" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Proven Expertise")).toBeInTheDocument();
    expect(screen.getByText("Cutting-Edge Technology")).toBeInTheDocument();
    expect(screen.getByText("Performance Focus")).toBeInTheDocument();
    expect(screen.getByText("Global Reach")).toBeInTheDocument();
  });

  it("renders the closing statement", () => {
    render(<WhyChooseUsAndClosingSection />);

    expect(
      screen.getByText(/We're not just building portfolios/),
    ).toBeInTheDocument();
  });
});
