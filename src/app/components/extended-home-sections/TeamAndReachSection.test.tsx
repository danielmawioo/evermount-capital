import { render, screen } from "@testing-library/react";
import TeamAndReachSection from "./TeamAndReachSection";

describe("TeamAndReachSection", () => {
  it("renders the leadership team heading and all members", () => {
    render(<TeamAndReachSection />);

    expect(
      screen.getByText("World-Class Research & Engineering Team"),
    ).toBeInTheDocument();

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(
      screen.getByText("CEO, Co-Founder & Low-Latency Systems Engineer"),
    ).toBeInTheDocument();
    expect(screen.getByText("Tony K.")).toBeInTheDocument();
    expect(
      screen.getByText("Head of Quantitative Research"),
    ).toBeInTheDocument();
  });

  it("renders the global reach heading and all stats", () => {
    render(<TeamAndReachSection />);

    expect(
      screen.getByText("Starting With African Markets"),
    ).toBeInTheDocument();

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("African Markets")).toBeInTheDocument();
    expect(screen.getByText("Vision")).toBeInTheDocument();
    expect(screen.getByText("Continent-Wide")).toBeInTheDocument();
  });
});
