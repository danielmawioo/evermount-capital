import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the heading and supporting copy", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        name: /Evermount — The AI Financial Intelligence & Trading Infrastructure Company for Africa/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We build intelligent financial systems that understand markets/),
    ).toBeInTheDocument();
  });
});
