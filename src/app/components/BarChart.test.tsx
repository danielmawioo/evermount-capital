import { render } from "@testing-library/react";
import BarChart from "./BarChart";

describe("BarChart", () => {
  it("renders a canvas chart without throwing", () => {
    const { container } = render(<BarChart />);

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
