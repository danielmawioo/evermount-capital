import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatInputBar from "./ChatInputBar";
import type { ChatDepartment } from "@/lib/chat-departments";

const department: ChatDepartment = {
  id: "technical",
  name: "Technical Support",
  description: "Platform issues, bugs, API access",
  color: "from-blue-500 to-blue-600",
  assistantName: "Ethan",
  escalationEmail: "support@evermount.co",
  suggestedPrompts: ["The dashboard won't load properly"],
  agentPlaybook: "playbook",
};

function renderInputBar(overrides: Partial<Parameters<typeof ChatInputBar>[0]> = {}) {
  const setInput = jest.fn();
  const onSend = jest.fn();
  const onKeyPress = jest.fn();
  const inputRef = createRef<HTMLInputElement>();

  const props = {
    theme: "light",
    activeDepartment: department,
    input: "",
    setInput,
    loading: false,
    onSend,
    onKeyPress,
    inputRef,
    ...overrides,
  };

  render(<ChatInputBar {...props} />);

  return { setInput, onSend, onKeyPress, props };
}

describe("ChatInputBar", () => {
  it("renders the input with a placeholder naming the active department", () => {
    renderInputBar();

    expect(
      screen.getByPlaceholderText("Ask Technical Support..."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Technical Support · Powered by AI"),
    ).toBeInTheDocument();
  });

  it("falls back to a generic placeholder when there is no active department", () => {
    renderInputBar({ activeDepartment: undefined });

    expect(screen.getByPlaceholderText("Ask us...")).toBeInTheDocument();
  });

  it("calls setInput with the new value when typing", () => {
    const { setInput } = renderInputBar();

    fireEvent.change(screen.getByPlaceholderText("Ask Technical Support..."), {
      target: { value: "Hello there" },
    });

    expect(setInput).toHaveBeenCalledWith("Hello there");
  });

  it("calls onKeyPress when a key is pressed in the input", () => {
    const { onKeyPress } = renderInputBar();

    fireEvent.keyDown(screen.getByPlaceholderText("Ask Technical Support..."), {
      key: "Enter",
    });

    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it("disables the send button when the input is empty", () => {
    renderInputBar({ input: "" });

    expect(screen.getByLabelText("Send message")).toBeDisabled();
  });

  it("disables the input and send button while loading", () => {
    renderInputBar({ input: "Hello", loading: true });

    expect(screen.getByPlaceholderText("Ask Technical Support...")).toBeDisabled();
    expect(screen.getByLabelText("Send message")).toBeDisabled();
  });

  it("calls onSend when the send button is clicked with a non-empty input", () => {
    const { onSend } = renderInputBar({ input: "Hello" });

    const sendButton = screen.getByLabelText("Send message");
    expect(sendButton).not.toBeDisabled();
    fireEvent.click(sendButton);

    expect(onSend).toHaveBeenCalledTimes(1);
  });
});
