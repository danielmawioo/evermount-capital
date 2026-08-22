import { render, screen } from "@testing-library/react";
import StatsSection from "./StatsSection";

describe("StatsSection", () => {
  it("renders the heading and all stats", () => {
    render(<StatsSection />);

    expect(
      screen.getByText("Our Numbers Speak For Themselves"),
    ).toBeInTheDocument();

    expect(screen.getByText("82")).toBeInTheDocument();
    expect(screen.getByText("Investor Partners")).toBeInTheDocument();
    expect(screen.getByText("40+")).toBeInTheDocument();
    expect(screen.getByText("Global Markets")).toBeInTheDocument();
  });
});
