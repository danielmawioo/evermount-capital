import { render } from "@testing-library/react";
import LineChart from "./LineChart";

describe("LineChart", () => {
  it("renders a canvas chart without throwing", () => {
    const { container } = render(<LineChart />);

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});
