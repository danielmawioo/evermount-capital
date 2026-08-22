import { render, screen } from "@testing-library/react";
import StrategiesTable from "./StrategiesTable";

describe("StrategiesTable", () => {
  it("shows a no-strategies message when there is nothing to show", () => {
    render(<StrategiesTable strategies={[]} />);

    expect(screen.getByText("Strategies")).toBeInTheDocument();
    expect(screen.getByText("No strategies reported")).toBeInTheDocument();
  });

  it("shows a no-strategies message when strategies is undefined", () => {
    render(<StrategiesTable strategies={undefined} />);

    expect(screen.getByText("No strategies reported")).toBeInTheDocument();
  });

  it("renders a row per strategy with active state and allocation percentage", () => {
    render(
      <StrategiesTable
        strategies={[
          { name: "momentum", active: true, capital_allocation: 0.5 },
          { name: "orderflow", active: false, capital_allocation: 0.25 },
        ]}
      />,
    );

    expect(screen.getByText("momentum")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();

    expect(screen.getByText("orderflow")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();

    expect(screen.getAllByText("Yes")).toHaveLength(1);
    expect(screen.getAllByText("No")).toHaveLength(1);
  });
});
