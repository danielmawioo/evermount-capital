import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManagersPage from "./page";

describe("ManagersPage", () => {
  it("renders the heading and all seeded managers", () => {
    render(<ManagersPage />);

    expect(
      screen.getByRole("heading", { name: "Portfolio Managers" })
    ).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("Michael Chen")).toBeInTheDocument();
    expect(screen.getByText("$2.5M")).toBeInTheDocument();
  });

  it("filters managers by search term matching name or role", async () => {
    const user = userEvent.setup();
    render(<ManagersPage />);

    const search = screen.getByPlaceholderText(
      "Search managers by name or role..."
    );
    await user.type(search, "quant");

    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
    expect(screen.queryByText("John Smith")).not.toBeInTheDocument();
    expect(screen.queryByText("Michael Chen")).not.toBeInTheDocument();
  });

  it("shows the empty state when no manager matches the search", async () => {
    const user = userEvent.setup();
    render(<ManagersPage />);

    const search = screen.getByPlaceholderText(
      "Search managers by name or role..."
    );
    await user.type(search, "nonexistent-manager");

    expect(
      screen.getByText("No managers found matching your search.")
    ).toBeInTheDocument();
  });

  it("opens the manager detail modal on card click and closes it", async () => {
    const user = userEvent.setup();
    render(<ManagersPage />);

    await user.click(screen.getByText("John Smith"));

    expect(
      screen.getByRole("heading", { name: "John Smith", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(/Joined Evermount Capital on/)).toBeInTheDocument();
    expect(screen.getByText("john.smith@evermount.co")).toBeInTheDocument();

    const closeButtons = screen.getAllByRole("button", { name: "" });
    const modalCloseButton = closeButtons.find((btn) =>
      btn.querySelector("svg")
    );
    await user.click(modalCloseButton!);

    expect(
      screen.queryByRole("heading", { name: "John Smith", level: 2 })
    ).not.toBeInTheDocument();
  });
});
