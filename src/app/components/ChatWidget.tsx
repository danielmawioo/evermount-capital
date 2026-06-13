"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import { CHAT_DEPARTMENTS, DEFAULT_CHAT_ASSISTANT } from "@/lib/chat-departments";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  links?: string[];
  needsHumanSupport?: boolean;
  isWelcome?: boolean;
}

const DEPARTMENT_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  technical: WrenchScrewdriverIcon,
  "it-support": ComputerDesktopIcon,
  payments: CreditCardIcon,
  compliance: ShieldCheckIcon,
  trading: ChartBarIcon,
  account: UserCircleIcon,
  general: QuestionMarkCircleIcon,
};

export default function ChatWidget() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
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
    const welcomeMessage: Message = {
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

      const userMessage: Message = {
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

        const assistantMessage: Message = {
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

  const showSuggestedPrompts =
    messages.length === 1 &&
    messages[0]?.isWelcome &&
    activeDepartment &&
    !loading;

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          isOpen
            ? "bg-gray-600 dark:bg-gray-700"
            : "bg-[#00a76f] hover:bg-emerald-700"
        } text-white`}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] md:w-96 h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
                theme === "dark"
                  ? "bg-gray-900 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div
                className={`px-4 py-4 border-b ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedDepartment && (
                    <button
                      onClick={() => {
                        setSelectedDepartment(null);
                        setMessages([]);
                      }}
                      className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition md:hidden"
                      aria-label="Back to departments"
                    >
                      <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00a76f] to-emerald-600 flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {assistantName}
                      {activeDepartment && (
                        <span className="font-normal text-gray-500 dark:text-gray-400">
                          {" "}
                          · {activeDepartment.name}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activeDepartment
                        ? "Resolving issues in your department"
                        : "AI Assistant · Select a department"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    aria-label="Close chat"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div
                className={`flex-1 overflow-y-auto p-4 ${
                  !selectedDepartment && theme === "light" ? "bg-gray-50" : ""
                }`}
              >
                {!selectedDepartment ? (
                  <div className="space-y-3">
                    <div className="text-center mb-4">
                      <p
                        className={`text-sm mb-1 ${
                          theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-700"
                        }`}
                      >
                        Hi! I&apos;m {assistantName}, your AI assistant.
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        Which department can help you today?
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {CHAT_DEPARTMENTS.map((dept) => {
                        const IconComponent =
                          DEPARTMENT_ICONS[dept.id] ??
                          QuestionMarkCircleIcon;
                        return (
                          <motion.button
                            key={dept.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDepartmentSelect(dept.id)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                              theme === "dark"
                                ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-700 shadow-lg"
                                : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 shadow-md hover:shadow-lg"
                            }`}
                          >
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                            >
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <p
                                className={`text-sm font-bold ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                              >
                                {dept.name}
                              </p>
                              <p
                                className={`text-xs mt-0.5 ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              >
                                {dept.description} · {dept.assistantName}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.role === "user"
                              ? "bg-[#00a76f] text-white"
                              : theme === "dark"
                                ? "bg-gray-800 text-gray-100"
                                : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content
                              .split(/(https?:\/\/[^\s]+)/g)
                              .map((part, i) => {
                                if (part.match(/^https?:\/\//)) {
                                  return (
                                    <a
                                      key={i}
                                      href={part}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#00a76f] dark:text-emerald-400 underline hover:opacity-80"
                                    >
                                      {part}
                                    </a>
                                  );
                                }
                                return <span key={i}>{part}</span>;
                              })}
                          </p>
                          {message.links && message.links.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-xs text-[#00a76f] dark:text-emerald-400 hover:underline break-all"
                                >
                                  {link}
                                </a>
                              ))}
                            </div>
                          )}
                          {message.needsHumanSupport && (
                            <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                              <a
                                href="/book-demo"
                                className="inline-block text-xs bg-[#00a76f] hover:bg-emerald-700 text-white px-3 py-1.5 rounded-md font-medium transition"
                              >
                                Book a Demo with Our Team
                              </a>
                            </div>
                          )}
                          <p
                            className={`text-xs mt-1 ${
                              message.role === "user"
                                ? "text-white/70"
                                : "text-gray-500"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {showSuggestedPrompts && (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Common questions:
                        </p>
                        {activeDepartment.suggestedPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => sendMessage(prompt)}
                            className={`block w-full text-left text-xs px-3 py-2 rounded-lg border transition ${
                              theme === "dark"
                                ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}

                    {loading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            theme === "dark"
                              ? "bg-gray-800 text-gray-100"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <div className="flex gap-1">
                            {[0, 0.2, 0.4].map((delay) => (
                              <motion.div
                                key={delay}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  delay,
                                }}
                                className="w-2 h-2 rounded-full bg-gray-400"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {selectedDepartment && (
                <div
                  className={`px-4 py-4 border-t ${
                    theme === "dark"
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={`Ask ${activeDepartment?.name ?? "us"}...`}
                      disabled={loading}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm border ${
                        theme === "dark"
                          ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      } focus:outline-none focus:ring-2 focus:ring-[#00a76f] disabled:opacity-50`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!input.trim() || loading}
                      className={`p-2 rounded-lg ${
                        input.trim() && !loading
                          ? "bg-[#00a76f] hover:bg-emerald-700 text-white"
                          : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      } transition-colors`}
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    {activeDepartment?.name} · Powered by AI
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
