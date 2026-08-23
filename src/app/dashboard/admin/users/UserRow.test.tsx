import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ApiUser } from "@/hooks/useAdminUsers";
import UserRow from "./UserRow";

const baseUser: ApiUser = {
  id: "u1",
  email: "investor@evermount.co",
  fullName: "Investor One",
  role: "INVESTOR",
  status: "active",
  kycStatus: "VERIFIED",
  createdAt: new Date().toISOString(),
  totalDeposits: 1000,
};

function renderRow(user: ApiUser, overrides: Record<string, unknown> = {}) {
  const onEdit = jest.fn();
  const onAssign = jest.fn();
  const onCredit = jest.fn();
  const onSuspend = jest.fn();
  const onDelete = jest.fn();

  render(
    <table>
      <tbody>
        <UserRow
          user={user}
          onEdit={onEdit}
          onAssign={onAssign}
          onCredit={onCredit}
          onSuspend={onSuspend}
          onDelete={onDelete}
          {...overrides}
        />
      </tbody>
    </table>,
  );

  return { onEdit, onAssign, onCredit, onSuspend, onDelete };
}

describe("UserRow", () => {
  it("renders user details", () => {
    renderRow(baseUser);

    expect(screen.getByText("Investor One")).toBeInTheDocument();
    expect(screen.getByText("investor@evermount.co")).toBeInTheDocument();
    expect(screen.getByText("INVESTOR")).toBeInTheDocument();
    expect(screen.getByText("VERIFIED")).toBeInTheDocument();
    expect(screen.getByText("$1,000")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("shows a dash when kycStatus is missing", () => {
    renderRow({ ...baseUser, kycStatus: undefined });

    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("shows Assign and Credit actions for investors and calls handlers", async () => {
    const user = userEvent.setup();
    const { onAssign, onCredit } = renderRow(baseUser);

    await user.click(screen.getByRole("button", { name: /assign/i }));
    expect(onAssign).toHaveBeenCalledWith(baseUser);

    await user.click(screen.getByRole("button", { name: /credit/i }));
    expect(onCredit).toHaveBeenCalledWith(baseUser);
  });

  it("hides Assign and Credit actions for non-investors", () => {
    renderRow({ ...baseUser, role: "ADMIN" });

    expect(
      screen.queryByRole("button", { name: /assign/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /credit/i }),
    ).not.toBeInTheDocument();
  });

  it("shows Suspend for active users and calls onSuspend with 'suspend'", async () => {
    const user = userEvent.setup();
    const { onSuspend } = renderRow(baseUser);

    await user.click(screen.getByRole("button", { name: /suspend/i }));
    expect(onSuspend).toHaveBeenCalledWith("u1", "suspend");
  });

  it("shows Activate for inactive users and calls onSuspend with 'activate'", async () => {
    const user = userEvent.setup();
    const { onSuspend } = renderRow({ ...baseUser, status: "inactive" });

    await user.click(screen.getByRole("button", { name: /activate/i }));
    expect(onSuspend).toHaveBeenCalledWith("u1", "activate");
  });

  it("calls onEdit and onDelete", async () => {
    const user = userEvent.setup();
    const { onEdit, onDelete } = renderRow(baseUser);

    await user.click(screen.getByRole("button", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledWith(baseUser);

    await user.click(screen.getByTitle("Delete"));
    expect(onDelete).toHaveBeenCalledWith("u1");
  });
});
