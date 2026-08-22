import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("shows the moon icon in light mode and toggles to dark on click", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button", { name: "Toggle theme" });
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggles back to light mode on a second click", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button", { name: "Toggle theme" });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("applies a custom className", () => {
    render(
      <ThemeProvider>
        <ThemeToggle className="custom-class" />
      </ThemeProvider>,
    );

    expect(screen.getByRole("button", { name: "Toggle theme" })).toHaveClass(
      "custom-class",
    );
  });
});
