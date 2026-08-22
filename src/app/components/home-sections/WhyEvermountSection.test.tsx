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
      screen.getByText("Global market access across multiple asset classes"),
    ).toBeInTheDocument();
  });
});
