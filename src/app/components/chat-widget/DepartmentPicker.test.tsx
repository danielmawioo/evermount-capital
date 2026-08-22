import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DepartmentPicker from "./DepartmentPicker";
import { CHAT_DEPARTMENTS } from "@/lib/chat-departments";

describe("DepartmentPicker", () => {
  it("greets the user with the assistant name and prompts for a department", () => {
    render(
      <DepartmentPicker
        theme="light"
        assistantName="Ethan"
        onSelect={jest.fn()}
      />,
    );

    expect(
      screen.getByText("Hi! I'm Ethan, your AI assistant."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Which department can help you today?"),
    ).toBeInTheDocument();
  });

  it("renders a button for every configured department", () => {
    render(
      <DepartmentPicker
        theme="light"
        assistantName="Ethan"
        onSelect={jest.fn()}
      />,
    );

    const firstDept = CHAT_DEPARTMENTS[0];
    const lastDept = CHAT_DEPARTMENTS[CHAT_DEPARTMENTS.length - 1];

    expect(screen.getByText(firstDept.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${firstDept.description} · ${firstDept.assistantName}`),
    ).toBeInTheDocument();

    expect(screen.getByText(lastDept.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${lastDept.description} · ${lastDept.assistantName}`),
    ).toBeInTheDocument();
  });

  it("calls onSelect with the department id when a department is clicked", async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();
    render(
      <DepartmentPicker
        theme="light"
        assistantName="Ethan"
        onSelect={onSelect}
      />,
    );

    const lastDept = CHAT_DEPARTMENTS[CHAT_DEPARTMENTS.length - 1];
    await user.click(screen.getByText(lastDept.name));

    expect(onSelect).toHaveBeenCalledWith(lastDept.id);
  });
});
