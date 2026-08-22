import { render, screen } from "@testing-library/react";
import ActivityFeed from "./ActivityFeed";

describe("ActivityFeed", () => {
  it("renders the heading and all activity items", () => {
    render(<ActivityFeed />);

    expect(
      screen.getByRole("heading", { name: "Recent Activity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Deposited $5,000 into Growth Fund"),
    ).toBeInTheDocument();
    expect(screen.getByText("Rebalanced portfolio")).toBeInTheDocument();
    expect(screen.getByText("Withdrew $1,200 to bank")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
  });
});
