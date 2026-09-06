import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the heading and supporting copy", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        name: /Build the Infrastructure Behind Modern Financial Markets/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /We're building the infrastructure behind modern financial markets/,
      ),
    ).toBeInTheDocument();
  });

  it("renders the illustration image", () => {
    render(<HeroSection />);

    expect(screen.getByAltText("Careers Illustration")).toBeInTheDocument();
  });
});
