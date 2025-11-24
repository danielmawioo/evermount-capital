"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access localStorage and window after mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = prefersDark ? "dark" : "light";
        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback for SSR/SSG when ThemeProvider is not available
    return {
      theme: "light" as "light" | "dark",
      toggleTheme: () => {
        // No-op during SSR
        if (typeof window !== "undefined") {
          const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
          const newTheme = currentTheme === "dark" ? "light" : "dark";
          localStorage.setItem("theme", newTheme);
          document.documentElement.classList.toggle("dark", newTheme === "dark");
        }
      },
    };
  }
  return context;
}
