import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the about headline", () => {
    render(<HeroSection />);
    expect(
      screen.getByRole("heading", {
        name: /Building the Infrastructure for Modern Financial Markets/i,
      }),
    ).toBeInTheDocument();
  });
});
