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

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    
    if (savedTheme) {
      // Use saved theme
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = prefersDark ? "dark" : "light";
      setTheme(systemTheme);
      if (systemTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Save system preference to localStorage
      localStorage.setItem("theme", systemTheme);
    }

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;

    // Calculate new theme based on current state
    setTheme((currentTheme) => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      // Update DOM immediately
      const htmlElement = document.documentElement;
      if (newTheme === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
      
      // Save to localStorage - this is critical for persistence
      try {
        localStorage.setItem("theme", newTheme);
      } catch (e) {
        console.error("Failed to save theme to localStorage:", e);
      }
      
      // Log for debugging (can be removed later)
      console.log("Theme toggled to:", newTheme);
      
      return newTheme;
    });
  };

  // Prevent hydration mismatch
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
        if (typeof window !== "undefined") {
          const isDark = document.documentElement.classList.contains("dark");
          const newTheme = isDark ? "light" : "dark";
          localStorage.setItem("theme", newTheme);
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },
    };
  }
  return context;
}
