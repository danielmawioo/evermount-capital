import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddUserModal from "./AddUserModal";

const baseForm = {
  fullName: "",
  email: "",
  password: "",
  role: "INVESTOR",
};

describe("AddUserModal", () => {
  it("renders nothing when closed", () => {
    const { container } = render(
      <AddUserModal
        open={false}
        form={baseForm}
        setForm={jest.fn()}
        submitting={false}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the form fields when open", () => {
    render(
      <AddUserModal
        open={true}
        form={baseForm}
        setForm={jest.fn()}
        submitting={false}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(screen.getByText("Add User")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Temporary Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create user/i }),
    ).toBeInTheDocument();
  });

  it("calls onCancel when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    render(
      <AddUserModal
        open={true}
        form={baseForm}
        setForm={jest.fn()}
        submitting={false}
        onSubmit={jest.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows submitting state on the submit button", () => {
    render(
      <AddUserModal
        open={true}
        form={baseForm}
        setForm={jest.fn()}
        submitting={true}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /creating/i });
    expect(submitButton).toBeDisabled();
  });
});
