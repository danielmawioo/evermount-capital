import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";

function ThemeConsumer() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
    </div>
  );
}

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("defaults to light theme when nothing is saved and no dark preference", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("prioritizes the theme saved in localStorage over other signals", () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggleTheme flips the theme and persists it to localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    fireEvent.click(screen.getByText("Toggle"));

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(screen.getByText("Toggle"));

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("setTheme sets an explicit theme and persists it", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText("Set Dark"));

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  describe("useTheme without a provider", () => {
    it("returns a fallback context that still works without throwing", () => {
      render(<ThemeConsumer />);

      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

      fireEvent.click(screen.getByText("Toggle"));

      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });
});
