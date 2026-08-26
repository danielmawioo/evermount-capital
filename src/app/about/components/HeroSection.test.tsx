import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the heading and supporting copy", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        name: "An Africa-Focused Quantitative Trading Company",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We're building the quantitative research, AI and/),
    ).toBeInTheDocument();
  });
});
