import { render, screen } from "@testing-library/react";
import ManagersPage from "./page";

describe("ManagersPage", () => {
  it("renders the heading and an honest empty state", () => {
    render(<ManagersPage />);

    expect(
      screen.getByRole("heading", { name: "Portfolio Managers" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("No relationship manager assigned to your account yet."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "support@evermount.co" }),
    ).toHaveAttribute("href", "mailto:support@evermount.co");
  });
});
