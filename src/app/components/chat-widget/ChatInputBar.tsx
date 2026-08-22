"use client";

import type { RefObject } from "react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import type { ChatDepartment } from "@/lib/chat-departments";

interface ChatInputBarProps {
  theme: string;
  activeDepartment?: ChatDepartment;
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function ChatInputBar({
  theme,
  activeDepartment,
  input,
  setInput,
  loading,
  onSend,
  onKeyPress,
  inputRef,
}: ChatInputBarProps) {
  return (
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
          onKeyDown={onKeyPress}
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
          onClick={onSend}
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
  );
}
