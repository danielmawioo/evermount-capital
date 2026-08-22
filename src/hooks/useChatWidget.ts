import { useState, useRef, useEffect, useCallback } from "react";
import { CHAT_DEPARTMENTS, DEFAULT_CHAT_ASSISTANT } from "@/lib/chat-departments";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  links?: string[];
  needsHumanSupport?: boolean;
  isWelcome?: boolean;
}

export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeDepartment = CHAT_DEPARTMENTS.find(
    (d) => d.id === selectedDepartment
  );
  const assistantName =
    activeDepartment?.assistantName ?? DEFAULT_CHAT_ASSISTANT;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current && selectedDepartment) {
      inputRef.current.focus();
    }
  }, [isOpen, selectedDepartment]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDepartment(null);
      setMessages([]);
      setInput("");
    }
  }, [isOpen]);

  const handleDepartmentSelect = (departmentId: string) => {
    const department = CHAT_DEPARTMENTS.find((d) => d.id === departmentId);
    setSelectedDepartment(departmentId);
    const welcomeMessage: ChatMessage = {
      role: "assistant",
      content: `Hello! I'm ${assistantName} from ${department?.name}. I can help you resolve ${department?.description.toLowerCase()} issues. What can I help you with today?`,
      timestamp: new Date(),
      isWelcome: true,
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading || !selectedDepartment) return;

      const userMessage: ChatMessage = {
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      // Only send conversation history (exclude canned welcome message)
      const apiMessages = updatedMessages
        .filter((msg) => !msg.isWelcome)
        .map((msg) => ({ role: msg.role, content: msg.content }));

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            assistantName,
            department: selectedDepartment,
          }),
        });

        const data = await response.json();

        if (!response.ok && !data.message) {
          throw new Error(data.error || "Request failed");
        }

        const assistantMessage: ChatMessage = {
          role: "assistant",
          content:
            data.message ||
            "I apologize, but I couldn't generate a response. Please try again.",
          timestamp: new Date(),
          links: data.links || [],
          needsHumanSupport: data.needsHumanSupport || false,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I apologize, but I'm experiencing technical difficulties. Please try again or contact support@evermount.co",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, selectedDepartment, messages, assistantName]
  );

  const handleSend = () => sendMessage(input);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestedPrompts = Boolean(
    messages.length === 1 &&
      messages[0]?.isWelcome &&
      activeDepartment &&
      !loading
  );

  return {
    isOpen,
    setIsOpen,
    selectedDepartment,
    setSelectedDepartment,
    messages,
    setMessages,
    input,
    setInput,
    loading,
    messagesEndRef,
    inputRef,
    activeDepartment,
    assistantName,
    handleDepartmentSelect,
    sendMessage,
    handleSend,
    handleKeyPress,
    showSuggestedPrompts,
  };
}
