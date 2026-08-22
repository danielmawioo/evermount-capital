import { render, screen } from "@testing-library/react";
import EquityCurveChart from "./EquityCurveChart";

describe("EquityCurveChart", () => {
  it("renders an empty state message when there is no data", () => {
    render(<EquityCurveChart data={[]} />);

    expect(
      screen.getByText(
        "No performance history yet. Invest to start tracking your equity curve.",
      ),
    ).toBeInTheDocument();
  });

  it("renders a canvas chart when equity data is provided", () => {
    const { container } = render(
      <EquityCurveChart
        data={[
          { date: "2024-01-01", equity: 1000 },
          { date: "2024-01-02", equity: 1050 },
          { date: "2024-01-03", equity: 1020 },
        ]}
      />,
    );

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("renders without error for a large dataset and custom currency", () => {
    const data = Array.from({ length: 40 }, (_, i) => ({
      date: `2024-01-${(i % 28) + 1}`,
      equity: 1000 + i * 10,
    }));

    const { container } = render(
      <EquityCurveChart data={data} currency="EUR" />,
    );

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
