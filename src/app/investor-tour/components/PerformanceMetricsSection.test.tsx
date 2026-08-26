import { render, screen } from "@testing-library/react";
import PerformanceMetricsSection from "./PerformanceMetricsSection";

describe("PerformanceMetricsSection", () => {
  it("renders the section heading and all metric cards", () => {
    render(<PerformanceMetricsSection />);

    expect(screen.getByText("Where We Are Today")).toBeInTheDocument();

    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Year Founded")).toBeInTheDocument();

    expect(screen.getByText("Private Beta")).toBeInTheDocument();
    expect(screen.getByText("Current Stage")).toBeInTheDocument();

    expect(screen.getByText("Systematic + AI")).toBeInTheDocument();
    expect(screen.getByText("Investment Approach")).toBeInTheDocument();
  });
});
