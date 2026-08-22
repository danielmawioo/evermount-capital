import { render } from "@testing-library/react";
import PieChart from "./PieChart";

describe("PieChart", () => {
  it("renders a canvas chart without throwing", () => {
    const { container } = render(<PieChart />);

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
