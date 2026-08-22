import { render, screen } from "@testing-library/react";
import QuantConnectionCard from "./QuantConnectionCard";

describe("QuantConnectionCard", () => {
  it("shows a disconnected, dashed-out state when there is no quant data", () => {
    render(<QuantConnectionCard connected={undefined} quant={undefined} />);

    expect(screen.getByText("Quant Connection")).toBeInTheDocument();
    expect(screen.getByText("Disconnected")).toBeInTheDocument();
    expect(screen.getByText(/Mode:/)).toHaveTextContent("Mode: —");
    expect(screen.getByText(/Last updated:/)).toHaveTextContent(
      "Last updated: —",
    );
  });

  it("shows connected status, mode and formatted last-updated time", () => {
    render(
      <QuantConnectionCard
        connected={true}
        quant={{
          kill_switch_active: false,
          mode: "paper",
          strategies: [],
          positions: [],
          metrics: {},
          last_updated: new Date(0).toISOString(),
        }}
      />,
    );

    expect(screen.getByText("Connected")).toBeInTheDocument();
    expect(screen.getByText(/Mode:/)).toHaveTextContent("Mode: paper");
    expect(screen.getByText(/Last updated:/)).toHaveTextContent(
      new Date(0).toLocaleString(),
    );
  });
});
