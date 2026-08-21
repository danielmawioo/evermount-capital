import { render, screen } from "@testing-library/react";
import RecentActivityList from "./RecentActivityList";

describe("RecentActivityList", () => {
  it("renders an empty state message when there are no items", () => {
    render(<RecentActivityList items={[]} />);

    expect(screen.getByText("No recent activity.")).toBeInTheDocument();
  });

  it("renders a list of activity items with formatted type, status, and amount", () => {
    render(
      <RecentActivityList
        items={[
          {
            id: "1",
            type: "wire_transfer",
            amount: 2500,
            status: "completed",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "2",
            type: "withdrawal",
            amount: 100,
            status: "pending",
            createdAt: new Date(
              Date.now() - 25 * 60 * 60 * 1000
            ).toISOString(),
          },
        ]}
      />
    );

    expect(screen.getByText("Wire Transfer")).toBeInTheDocument();
    expect(screen.getByText(/2h ago/)).toBeInTheDocument();
    expect(screen.getByText(/completed/)).toBeInTheDocument();
    expect(screen.getByText("$2,500")).toBeInTheDocument();

    expect(screen.getByText("Withdrawal")).toBeInTheDocument();
    expect(screen.getByText(/Yesterday/)).toBeInTheDocument();
    expect(screen.getByText(/pending/)).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("shows 'Just now' for very recent activity", () => {
    render(
      <RecentActivityList
        items={[
          {
            id: "3",
            type: "deposit",
            amount: 50,
            status: "success",
            createdAt: new Date().toISOString(),
          },
        ]}
      />
    );

    expect(screen.getByText(/Just now/)).toBeInTheDocument();
    expect(screen.getByText("Deposit")).toBeInTheDocument();
  });
});
