"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from DOM (set by script in head) or localStorage
  const getInitialTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    
    // First check if already set in DOM (by head script)
    const hasDarkClass = document.documentElement.classList.contains("dark");
    if (hasDarkClass) {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
      return "dark";
    }
    
    // Check localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync state with DOM on mount
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      
      // If there's a saved theme, use it and apply it
      if (savedTheme) {
        setTheme(savedTheme);
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        // Otherwise check current DOM state (set by head script)
        const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        setTheme(currentTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === "undefined") return;
    
    // Use current theme state to determine new theme
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Update state first
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    
    // Update DOM class immediately
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Force a re-render by updating the root element
    document.documentElement.setAttribute("data-theme", newTheme);
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
