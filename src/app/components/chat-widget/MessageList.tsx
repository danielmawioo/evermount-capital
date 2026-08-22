"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import type { ChatDepartment } from "@/lib/chat-departments";
import type { ChatMessage } from "@/hooks/useChatWidget";

interface MessageListProps {
  theme: string;
  messages: ChatMessage[];
  activeDepartment?: ChatDepartment;
  loading: boolean;
  showSuggestedPrompts: boolean;
  onSuggestedPromptClick: (prompt: string) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

function renderLinkedContent(content: string) {
  return content.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
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
  });
}

export default function MessageList({
  theme,
  messages,
  activeDepartment,
  loading,
  showSuggestedPrompts,
  onSuggestedPromptClick,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
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
              {renderLinkedContent(message.content)}
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
                message.role === "user" ? "text-white/70" : "text-gray-500"
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

      {showSuggestedPrompts && activeDepartment && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Common questions:
          </p>
          {activeDepartment.suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSuggestedPromptClick(prompt)}
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
  );
}
