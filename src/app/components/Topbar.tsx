"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/context/ThemeContext";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good morning 🌅");
    } else if (hour < 18) {
      setGreeting("Good afternoon ☀️");
    } else {
      setGreeting("Good evening 🌙");
    }
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-6 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm transition-colors duration-300">
      {/* Greeting Section */}
      <div>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          {greeting}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Let’s grow your portfolio today 🚀
        </p>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <SunIcon className="w-5 h-5 text-yellow-400" />
        ) : (
          <MoonIcon className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </header>
  );
}
