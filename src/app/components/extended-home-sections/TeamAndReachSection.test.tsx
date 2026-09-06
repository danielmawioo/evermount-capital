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

  it("does not publish a NOW / NEXT / THEN product roadmap", () => {
    render(<TeamAndReachSection />);

    expect(screen.queryByText("NOW")).not.toBeInTheDocument();
    expect(screen.queryByText("VISION")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Cross-Market Financial Infrastructure"),
    ).not.toBeInTheDocument();
  });
});
