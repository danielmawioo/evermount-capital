import { render, screen } from "@testing-library/react";
import PerformanceMetricsSection from "./PerformanceMetricsSection";

describe("PerformanceMetricsSection", () => {
  it("renders the section heading and all metric cards", () => {
    render(<PerformanceMetricsSection />);

    expect(screen.getByText("Performance Snapshot")).toBeInTheDocument();

    expect(screen.getByText("18.5%")).toBeInTheDocument();
    expect(screen.getByText("Annualized Returns")).toBeInTheDocument();

    expect(screen.getByText("$300K")).toBeInTheDocument();
    expect(screen.getByText("Assets Under Management")).toBeInTheDocument();

    expect(screen.getByText("82")).toBeInTheDocument();
    expect(screen.getByText("Investor Partners")).toBeInTheDocument();
  });
});
