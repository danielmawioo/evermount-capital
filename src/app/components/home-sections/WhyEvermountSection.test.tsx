import { render, screen } from "@testing-library/react";
import WhyEvermountSection from "./WhyEvermountSection";

describe("WhyEvermountSection", () => {
  it("renders the heading and all points", () => {
    render(<WhyEvermountSection />);

    expect(
      screen.getByText("From Financial Intelligence to Execution"),
    ).toBeInTheDocument();

    expect(screen.getByText("AI-powered market intelligence")).toBeInTheDocument();
    expect(screen.getByText("Market connectivity infrastructure")).toBeInTheDocument();
  });
});
