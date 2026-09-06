"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  SparklesIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";
import { useChatWidget } from "@/hooks/useChatWidget";
import DepartmentPicker from "@/app/components/chat-widget/DepartmentPicker";
import MessageList from "@/app/components/chat-widget/MessageList";
import ChatInputBar from "@/app/components/chat-widget/ChatInputBar";

export default function ChatWidget() {
  const { theme } = useTheme();
  const {
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
  } = useChatWidget();

  return (
    <TranslateTree>
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
                  <DepartmentPicker
                    theme={theme}
                    assistantName={assistantName}
                    onSelect={handleDepartmentSelect}
                  />
                ) : (
                  <MessageList
                    theme={theme}
                    messages={messages}
                    activeDepartment={activeDepartment}
                    loading={loading}
                    showSuggestedPrompts={showSuggestedPrompts}
                    onSuggestedPromptClick={sendMessage}
                    messagesEndRef={messagesEndRef}
                  />
                )}
              </div>

              {selectedDepartment && (
                <ChatInputBar
                  theme={theme}
                  activeDepartment={activeDepartment}
                  input={input}
                  setInput={setInput}
                  loading={loading}
                  onSend={handleSend}
                  onKeyPress={handleKeyPress}
                  inputRef={inputRef}
                />
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  
    </TranslateTree>
  );
}
