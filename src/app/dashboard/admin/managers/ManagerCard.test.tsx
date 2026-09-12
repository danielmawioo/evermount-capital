import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ManagerCard from "./ManagerCard";

const MANAGER = {
  id: "m1",
  email: "jane@evermount.co",
  fullName: "Jane Doe",
  status: "active" as const,
  clientCount: 2,
  joinDate: "2024-01-01T00:00:00.000Z",
};

describe("ManagerCard", () => {
  it("renders manager details and client actions", async () => {
    const user = userEvent.setup();
    const onManageClients = jest.fn();
    const onToggleStatus = jest.fn();

    render(
      <ManagerCard
        manager={MANAGER}
        onManageClients={onManageClients}
        onToggleStatus={onToggleStatus}
      />,
    );

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("2 clients")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Clients" }));
    expect(onManageClients).toHaveBeenCalledWith(MANAGER);
  });
});
