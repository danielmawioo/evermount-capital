import { render, screen } from "@testing-library/react";
import WhyEvermountSection from "./WhyEvermountSection";

describe("WhyEvermountSection", () => {
  it("renders the heading and all points", () => {
    render(<WhyEvermountSection />);

    expect(
      screen.getByText("Systematic Investment Excellence"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Proprietary quantitative models with machine learning and statistical arbitrage",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Building toward continent-wide market access across African financial markets",
      ),
    ).toBeInTheDocument();
  });
});
