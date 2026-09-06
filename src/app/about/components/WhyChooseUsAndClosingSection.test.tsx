import { render, screen } from "@testing-library/react";
import WhyChooseUsAndClosingSection from "./WhyChooseUsAndClosingSection";

describe("WhyChooseUsAndClosingSection", () => {
  it("renders the why choose us heading and items", () => {
    render(<WhyChooseUsAndClosingSection />);

    expect(
      screen.getByRole("heading", { name: "Why Choose Evermount" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Proven Expertise")).toBeInTheDocument();
    expect(screen.getByText("Technology Driven")).toBeInTheDocument();
    expect(screen.getByText("Research-Driven Approach")).toBeInTheDocument();
    expect(screen.getByText("Globally Oriented")).toBeInTheDocument();
  });

  it("renders the closing statement", () => {
    render(<WhyChooseUsAndClosingSection />);

    expect(
      screen.getByText(/We're building the data, research, intelligence/),
    ).toBeInTheDocument();
  });
});
