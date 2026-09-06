import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { ThemeProvider } from "@/context/ThemeContext";
import { LocaleProvider } from "@/context/LocaleContext";
import Topbar from "./Topbar";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: jest.fn(), back: jest.fn() }),
  usePathname: () => "/dashboard",
  useSearchParams: () => new URLSearchParams(),
}));

function renderTopbar() {
  return render(
    <ThemeProvider>
      <LocaleProvider>
        <Topbar />
      </LocaleProvider>
    </ThemeProvider>,
  );
}

describe("Topbar", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    document.documentElement.classList.remove("dark");
    push.mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders a time-based greeting and the search input", () => {
    renderTopbar();

    expect(
      screen.getByRole("heading", {
        name: /Good morning|Good afternoon|Good evening/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("opens and closes the notifications dropdown via the bell button", async () => {
    const user = userEvent.setup();
    renderTopbar();

    expect(screen.queryByText("No new notifications.")).not.toBeInTheDocument();

    // The bell button is the only icon button with no accessible name
    // (unlike the theme toggle, which has an aria-label, and the language
    // and profile buttons, which have visible text / alt text).
    const bellButton = screen.getByRole("button", { name: "" });
    await user.click(bellButton);

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("No new notifications.")).toBeInTheDocument();

    await user.click(bellButton);
    await waitFor(() =>
      expect(
        screen.queryByText("No new notifications."),
      ).not.toBeInTheDocument(),
    );
  });

  it("opens the language dropdown and selects a language", async () => {
    const user = userEvent.setup();
    renderTopbar();

    await user.click(screen.getByLabelText("Language"));
    expect(screen.getByRole("option", { name: "Deutsch" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Nederlands" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Français" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("option", { name: "English" }),
      ).not.toBeInTheDocument(),
    );
    expect(screen.getByLabelText("Langue")).toBeInTheDocument();
  });

  it("toggles dark mode via the header theme button", async () => {
    const user = userEvent.setup();
    renderTopbar();

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    await user.click(screen.getByLabelText("Toggle theme"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("opens the profile dropdown and sets the theme to light/dark from it", async () => {
    const user = userEvent.setup();
    renderTopbar();

    await user.click(screen.getByRole("img", { name: "User Avatar" }));

    expect(screen.getByText("Daniel Mawioo")).toBeInTheDocument();
    expect(screen.getByText("Mem No. 30280376")).toBeInTheDocument();

    await user.click(screen.getByText("Dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await user.click(screen.getByText("Light"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("logs out, clears auth, shows confirmation, and redirects home", async () => {
    mock.onPost("/auth/logout").reply(200, {});
    const user = userEvent.setup();

    renderTopbar();

    await user.click(screen.getByRole("img", { name: "User Avatar" }));
    await user.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() =>
      expect(
        screen.getByText("✅ Logged out successfully!"),
      ).toBeInTheDocument(),
    );

    await waitFor(() => expect(push).toHaveBeenCalledWith("/"), {
      timeout: 3000,
    });
  });

  it("still clears auth and redirects when the logout API call fails", async () => {
    mock.onPost("/auth/logout").reply(500);
    const user = userEvent.setup();

    renderTopbar();

    await user.click(screen.getByRole("img", { name: "User Avatar" }));
    await user.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() =>
      expect(
        screen.getByText("✅ Logged out successfully!"),
      ).toBeInTheDocument(),
    );

    await waitFor(() => expect(push).toHaveBeenCalledWith("/"), {
      timeout: 3000,
    });
  });

  it("closes an open dropdown when clicking outside of it", async () => {
    const user = userEvent.setup();
    renderTopbar();

    await user.click(screen.getByLabelText("Language"));
    expect(
      screen.getByRole("option", { name: "Français" }),
    ).toBeInTheDocument();

    await user.click(document.body);

    await waitFor(() =>
      expect(
        screen.queryByRole("option", { name: "Français" }),
      ).not.toBeInTheDocument(),
    );
  });
});
