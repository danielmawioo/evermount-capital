import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import toast from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "./Navbar";

jest.mock("react-hot-toast", () => {
  const fn = jest.fn() as jest.Mock & { success: jest.Mock; error: jest.Mock };
  fn.success = jest.fn();
  fn.error = jest.fn();
  return {
    __esModule: true,
    default: fn,
    Toaster: () => null,
  };
});

const toastFn = toast as unknown as jest.Mock & {
  success: jest.Mock;
  error: jest.Mock;
};

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );
}

describe("Navbar", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    toastFn.mockClear();
    toastFn.success.mockClear();
    toastFn.error.mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  it("renders the logo, top-level nav links and team CTA", () => {
    renderNavbar();

    expect(screen.getAllByText("Evermount").length).toBeGreaterThan(0);
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Markets")).toBeInTheDocument();
    expect(screen.getByText("Institutions")).toBeInTheDocument();
    expect(screen.getAllByText("Request Access").length).toBeGreaterThan(0);
  });

  it("toggles the mobile menu open and closed", async () => {
    const user = userEvent.setup();
    renderNavbar();

    expect(screen.queryByText("Light Mode")).not.toBeInTheDocument();
    expect(screen.queryByText("Dark Mode")).not.toBeInTheDocument();

    await user.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Toggle menu"));
    await waitFor(() =>
      expect(screen.queryByText("Dark Mode")).not.toBeInTheDocument(),
    );
  });

  it("toggles the theme when the theme button is clicked", async () => {
    const user = userEvent.setup();
    renderNavbar();

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(screen.getByLabelText("Toggle theme"));

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("opens the waitlist modal when the openWaitlist event fires", async () => {
    renderNavbar();

    expect(
      screen.queryByRole("heading", { name: "Request Access" }),
    ).not.toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event("openWaitlist"));
    });

    expect(await screen.findByRole("heading", { name: "Request Access" })).toBeInTheDocument();
  });

  it("shows a validation error toast for an invalid email in the waitlist form", async () => {
    const user = userEvent.setup();
    renderNavbar();

    act(() => {
      window.dispatchEvent(new Event("openWaitlist"));
    });
    await screen.findByRole("heading", { name: "Request Access" });

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "not-an-email",
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(toastFn.error).toHaveBeenCalledWith(
      "Please enter a valid email address.",
    );
    expect(mock.history.post.length).toBe(0);
  });

  it("submits a valid waitlist email successfully and closes the modal", async () => {
    mock.onPost("/waitlist").reply(200, {});
    const user = userEvent.setup();
    renderNavbar();

    act(() => {
      window.dispatchEvent(new Event("openWaitlist"));
    });
    await screen.findByRole("heading", { name: "Request Access" });

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "investor@example.com",
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(toastFn.success).toHaveBeenCalledWith(
        "You're on the waitlist! 🎉",
      );
    });
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      email: "investor@example.com",
    });
    await waitFor(() => {
      expect(
      screen.queryByRole("heading", { name: "Request Access" }),
    ).not.toBeInTheDocument();
    });
  });

  it("shows an error toast when the waitlist submission fails", async () => {
    mock.onPost("/waitlist").reply(500, {
      error: { message: "Server exploded" },
    });
    const user = userEvent.setup();
    renderNavbar();

    act(() => {
      window.dispatchEvent(new Event("openWaitlist"));
    });
    await screen.findByRole("heading", { name: "Request Access" });

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "investor@example.com",
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(toastFn.error).toHaveBeenCalledWith("Server exploded");
    });
    expect(screen.getByRole("heading", { name: "Request Access" })).toBeInTheDocument();
  });

  it("closes the waitlist modal via the close button and clears the email", async () => {
    const user = userEvent.setup();
    renderNavbar();

    act(() => {
      window.dispatchEvent(new Event("openWaitlist"));
    });
    await screen.findByRole("heading", { name: "Request Access" });

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "investor@example.com",
    );

    const closeButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.querySelector("svg"));
    // The close (X) button is the one inside the modal without visible text.
    const modalCloseButton = closeButtons.find((btn) =>
      btn.className.includes("absolute top-4 right-4"),
    );
    expect(modalCloseButton).toBeTruthy();
    await user.click(modalCloseButton as HTMLElement);

    await waitFor(() => {
      expect(
      screen.queryByRole("heading", { name: "Request Access" }),
    ).not.toBeInTheDocument();
    });
  });
});
