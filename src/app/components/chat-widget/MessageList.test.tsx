import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageList from "./MessageList";
import type { ChatMessage } from "@/hooks/useChatWidget";
import type { ChatDepartment } from "@/lib/chat-departments";

const department: ChatDepartment = {
  id: "technical",
  name: "Technical Support",
  description: "Platform issues, bugs, API access",
  color: "from-blue-500 to-blue-600",
  assistantName: "Ethan",
  escalationEmail: "support@evermount.co",
  suggestedPrompts: [
    "The dashboard won't load properly",
    "How do I access the API?",
  ],
  agentPlaybook: "playbook",
};

function renderList(
  overrides: Partial<Parameters<typeof MessageList>[0]> = {},
) {
  const onSuggestedPromptClick = jest.fn();
  const messagesEndRef = createRef<HTMLDivElement>();

  const props = {
    theme: "light",
    messages: [] as ChatMessage[],
    activeDepartment: department,
    loading: false,
    showSuggestedPrompts: false,
    onSuggestedPromptClick,
    messagesEndRef,
    ...overrides,
  };

  render(<MessageList {...props} />);

  return { onSuggestedPromptClick };
}

describe("MessageList", () => {
  it("renders user and assistant message content", () => {
    const messages: ChatMessage[] = [
      { role: "user", content: "Hello there", timestamp: new Date() },
      { role: "assistant", content: "How can I help?", timestamp: new Date() },
    ];

    renderList({ messages });

    expect(screen.getByText("Hello there")).toBeInTheDocument();
    expect(screen.getByText("How can I help?")).toBeInTheDocument();
  });

  it("renders URLs within a message as clickable links", () => {
    const messages: ChatMessage[] = [
      {
        role: "assistant",
        content: "Visit https://www.evermount.co/book-demo for details",
        timestamp: new Date(),
      },
    ];

    renderList({ messages });

    const link = screen.getByText("https://www.evermount.co/book-demo");
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://www.evermount.co/book-demo",
    );
  });

  it("renders extra links attached to a message", () => {
    const messages: ChatMessage[] = [
      {
        role: "assistant",
        content: "Here are some resources",
        timestamp: new Date(),
        links: ["https://www.evermount.co/pricing"],
      },
    ];

    renderList({ messages });

    expect(
      screen.getByRole("link", { name: "https://www.evermount.co/pricing" }),
    ).toHaveAttribute("href", "https://www.evermount.co/pricing");
  });

  it("renders a book-a-demo link when the message needs human support", () => {
    const messages: ChatMessage[] = [
      {
        role: "assistant",
        content: "Let's get you connected with our team",
        timestamp: new Date(),
        needsHumanSupport: true,
      },
    ];

    renderList({ messages });

    expect(
      screen.getByRole("link", { name: "Book a Demo with Our Team" }),
    ).toHaveAttribute("href", "/book-demo");
  });

  it("renders suggested prompts when enabled and calls the callback on click", async () => {
    const user = userEvent.setup();
    const { onSuggestedPromptClick } = renderList({
      messages: [
        {
          role: "assistant",
          content: "Welcome",
          timestamp: new Date(),
          isWelcome: true,
        },
      ],
      showSuggestedPrompts: true,
    });

    expect(screen.getByText("Common questions:")).toBeInTheDocument();
    const prompt = department.suggestedPrompts[0];
    await user.click(screen.getByText(prompt));

    expect(onSuggestedPromptClick).toHaveBeenCalledWith(prompt);
  });

  it("does not render suggested prompts when disabled", () => {
    renderList({ showSuggestedPrompts: false });

    expect(screen.queryByText("Common questions:")).not.toBeInTheDocument();
  });

  it("renders without throwing while loading", () => {
    const { container } = render(
      <MessageList
        theme="light"
        messages={[]}
        activeDepartment={department}
        loading
        showSuggestedPrompts={false}
        onSuggestedPromptClick={jest.fn()}
        messagesEndRef={createRef<HTMLDivElement>()}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});
