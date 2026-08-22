import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoReconciliationCard from "./DemoReconciliationCard";

describe("DemoReconciliationCard", () => {
  it("shows an empty state and still allows triggering actions", async () => {
    const user = userEvent.setup();
    const onSyncPositions = jest.fn();
    const onRunReconciliation = jest.fn();
    render(
      <DemoReconciliationCard
        reconHistory={[]}
        actionLoading={false}
        onSyncPositions={onSyncPositions}
        onRunReconciliation={onRunReconciliation}
      />,
    );

    expect(screen.getByText("No reconciliation runs yet")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Sync positions/i }));
    expect(onSyncPositions).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole("button", { name: /Run reconciliation/i }),
    );
    expect(onRunReconciliation).toHaveBeenCalledTimes(1);
  });

  it("lists only the five most recent reconciliation runs", () => {
    const reconHistory = Array.from({ length: 7 }, (_, i) => ({
      id: `run-${i}`,
      status: i === 0 ? "OK" : "DRIFT",
      navDriftCount: i,
      createdAt: new Date(2024, 0, i + 1).toISOString(),
    }));

    render(
      <DemoReconciliationCard
        reconHistory={reconHistory}
        actionLoading={false}
        onSyncPositions={jest.fn()}
        onRunReconciliation={jest.fn()}
      />,
    );

    expect(screen.getAllByText(/drift\(s\)/)).toHaveLength(5);
    expect(screen.getByText("OK")).toBeInTheDocument();
  });
});
