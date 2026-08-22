import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import KillSwitchCard from "./KillSwitchCard";

describe("KillSwitchCard", () => {
  it("shows inactive state and activates the kill switch on click", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <KillSwitchCard
        killActive={false}
        quant={null}
        actionLoading={false}
        onToggle={onToggle}
      />,
    );

    expect(screen.getByText(/Inactive — trading allowed/i)).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /Activate Kill Switch/i }),
    );
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("shows the active reason and deactivates on click", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <KillSwitchCard
        killActive={true}
        quant={{
          kill_switch_active: true,
          kill_switch_reason: "Manual halt",
          mode: "paper",
          strategies: [],
          positions: [],
          metrics: {},
          last_updated: new Date(0).toISOString(),
        }}
        actionLoading={false}
        onToggle={onToggle}
      />,
    );

    expect(screen.getByText(/ACTIVE — Manual halt/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Deactivate/i }));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
