import { render, screen } from "@testing-library/react";
import ApproachAndValuesSection from "./ApproachAndValuesSection";

describe("ApproachAndValuesSection", () => {
  it("renders the approach and principles headings", () => {
    render(<ApproachAndValuesSection />);

    expect(
      screen.getByRole("heading", { name: "Our Technology Approach" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Our Principles" }),
    ).toBeInTheDocument();
  });

  it("renders each approach item", () => {
    render(<ApproachAndValuesSection />);

    expect(screen.getByText("Systematic & Data-Driven")).toBeInTheDocument();
    expect(screen.getByText("API First")).toBeInTheDocument();
    expect(screen.getByText("Risk First")).toBeInTheDocument();
  });

  it("renders each principle", () => {
    render(<ApproachAndValuesSection />);

    expect(screen.getByText("Infrastructure First")).toBeInTheDocument();
    expect(screen.getByText("Data Driven")).toBeInTheDocument();
    expect(screen.getByText("Globally Oriented")).toBeInTheDocument();
    expect(screen.getByText("Technology Driven")).toBeInTheDocument();
  });
});
