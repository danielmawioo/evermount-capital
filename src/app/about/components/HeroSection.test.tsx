import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the heading and supporting copy", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: "A New Breed of Hedge Fund" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're building the future of capital growth — driven by data,/,
      ),
    ).toBeInTheDocument();
  });
});
