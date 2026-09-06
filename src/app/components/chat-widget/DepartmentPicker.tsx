"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { motion } from "framer-motion";
import {
  WrenchScrewdriverIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { CHAT_DEPARTMENTS } from "@/lib/chat-departments";

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

interface DepartmentPickerProps {
  theme: string;
  assistantName: string;
  onSelect: (departmentId: string) => void;
}

export default function DepartmentPicker({
  theme,
  assistantName,
  onSelect,
}: DepartmentPickerProps) {
  return (
    <TranslateTree>
    <div className="space-y-3">
      <div className="text-center mb-4">
        <p
          className={`text-sm mb-1 ${
            theme === "dark" ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Hi! I&apos;m {assistantName}, your AI assistant.
        </p>
        <p
          className={`text-sm font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Which department can help you today?
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {CHAT_DEPARTMENTS.map((dept) => {
          const IconComponent =
            DEPARTMENT_ICONS[dept.id] ?? QuestionMarkCircleIcon;
          return (
            <motion.button
              key={dept.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(dept.id)}
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
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dept.name}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
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
  
    </TranslateTree>
  );
}
