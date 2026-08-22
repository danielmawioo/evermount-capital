import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OpsHeader from "./OpsHeader";

describe("OpsHeader", () => {
  it("renders the title, subtitle and triggers a refresh on click", async () => {
    const user = userEvent.setup();
    const onRefresh = jest.fn();
    render(<OpsHeader loading={false} onRefresh={onRefresh} />);

    expect(screen.getByText("Trading Ops")).toBeInTheDocument();
    expect(
      screen.getByText("Monitor quant engine, kill switch, and NAV publishing"),
    ).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Refresh/i });
    expect(button).not.toBeDisabled();
    await user.click(button);
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("disables the refresh button and spins the icon while loading", () => {
    render(<OpsHeader loading={true} onRefresh={jest.fn()} />);

    const button = screen.getByRole("button", { name: /Refresh/i });
    expect(button).toBeDisabled();
    expect(button.querySelector("svg")).toHaveClass("animate-spin");
  });
});
