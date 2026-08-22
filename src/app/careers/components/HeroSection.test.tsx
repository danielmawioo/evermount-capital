import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the heading and supporting copy", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", { name: "Join the Evermount Mission" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're building the future of quantitative investment management/,
      ),
    ).toBeInTheDocument();
  });

  it("renders the illustration image", () => {
    render(<HeroSection />);

    expect(screen.getByAltText("Careers Illustration")).toBeInTheDocument();
  });
});
