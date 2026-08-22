import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StrategyLifecycleTable from "./StrategyLifecycleTable";

describe("StrategyLifecycleTable", () => {
  it("shows a no-records message when there is nothing to show", () => {
    render(
      <StrategyLifecycleTable
        lifecycle={[]}
        strategies={[]}
        actionLoading={false}
        onPromotionCheck={jest.fn()}
        onPromote={jest.fn()}
      />,
    );

    expect(screen.getByText("No lifecycle records")).toBeInTheDocument();
  });

  it("falls back to a per-strategy check/promote list when lifecycle is empty", async () => {
    const user = userEvent.setup();
    const onPromotionCheck = jest.fn();
    const onPromote = jest.fn();
    render(
      <StrategyLifecycleTable
        lifecycle={[]}
        strategies={[
          { name: "momentum", active: true, capital_allocation: 0.5 },
        ]}
        actionLoading={false}
        onPromotionCheck={onPromotionCheck}
        onPromote={onPromote}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Walk-forward check/i }),
    );
    expect(onPromotionCheck).toHaveBeenCalledWith("momentum");

    await user.click(screen.getByRole("button", { name: /Promote to PAPER/i }));
    expect(onPromote).toHaveBeenCalledWith("momentum", "PAPER");
  });

  it("hides the promote action once a strategy reaches PAPER or PRODUCTION", () => {
    render(
      <StrategyLifecycleTable
        lifecycle={[
          {
            id: "1",
            strategyKey: "momentum",
            status: "PAPER",
            walkForwardScore: 1.2,
          },
          { id: "2", strategyKey: "orderflow", status: "BACKTEST" },
        ]}
        strategies={[]}
        actionLoading={false}
        onPromotionCheck={jest.fn()}
        onPromote={jest.fn()}
      />,
    );

    expect(screen.getByText("momentum")).toBeInTheDocument();
    expect(screen.getByText("1.20")).toBeInTheDocument();
    expect(screen.getByText("orderflow")).toBeInTheDocument();
    expect(screen.getByText("→ PAPER")).toBeInTheDocument();
    expect(screen.getAllByText("Check")).toHaveLength(2);
  });
});
