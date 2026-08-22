import { render, screen } from "@testing-library/react";
import HowItWorksSection from "./HowItWorksSection";

describe("HowItWorksSection", () => {
  it("renders the section heading and all step cards", () => {
    render(<HowItWorksSection />);

    expect(screen.getByText("How It Works")).toBeInTheDocument();

    expect(screen.getByText("Data-Driven Research")).toBeInTheDocument();
    expect(
      screen.getByText(
        /We analyze millions of data points using machine learning/,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Systematic Execution")).toBeInTheDocument();

    expect(screen.getByText("Transparent Reporting")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Track performance in real-time via your personalized investor dashboard/,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Data-Driven Research" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Transparent Reporting" }),
    ).toBeInTheDocument();
  });
});
