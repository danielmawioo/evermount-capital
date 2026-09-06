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

  it("renders the technology roadmap heading and stages", () => {
    render(<TeamAndReachSection />);

    expect(
      screen.getByText("Cross-Market Financial Infrastructure"),
    ).toBeInTheDocument();

    expect(screen.getByText("NOW")).toBeInTheDocument();
    expect(screen.getByText("AI + Quant Research")).toBeInTheDocument();
    expect(screen.getByText("VISION")).toBeInTheDocument();
    expect(screen.getByText("Cross-market infrastructure")).toBeInTheDocument();
  });
});
