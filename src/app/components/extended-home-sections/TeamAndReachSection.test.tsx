import { render, screen } from "@testing-library/react";
import TeamAndReachSection from "./TeamAndReachSection";

describe("TeamAndReachSection", () => {
  it("renders the leadership team heading and all members", () => {
    render(<TeamAndReachSection />);

    expect(
      screen.getByText("World-Class Research & Engineering Team"),
    ).toBeInTheDocument();

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(screen.getByText("CEO & Co-Founder")).toBeInTheDocument();
    expect(screen.getByText("Tony K.")).toBeInTheDocument();
    expect(
      screen.getByText("Head of Quantitative Research"),
    ).toBeInTheDocument();
  });

  it("renders the global reach heading and all stats", () => {
    render(<TeamAndReachSection />);

    expect(
      screen.getByText("Global Market Access & Diversification"),
    ).toBeInTheDocument();

    expect(screen.getByText("Equities")).toBeInTheDocument();
    expect(screen.getByText("50+ Exchanges")).toBeInTheDocument();
    expect(screen.getByText("Commodities")).toBeInTheDocument();
    expect(screen.getByText("Futures & Spot")).toBeInTheDocument();
  });
});
