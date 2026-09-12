import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddClientModal from "./AddClientModal";

describe("AddClientModal", () => {
  it("switches between create and assign modes", async () => {
    const user = userEvent.setup();
    const setAddMode = jest.fn();
    const setClientForm = jest.fn();

    render(
      <AddClientModal
        addMode="create"
        setAddMode={setAddMode}
        clientForm={{ fullName: "", email: "", password: "", notes: "" }}
        setClientForm={setClientForm}
        addingClient={false}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    expect(screen.getByPlaceholderText("Client name")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Assign existing" }));
    expect(setAddMode).toHaveBeenCalledWith("assign");
  });
});
