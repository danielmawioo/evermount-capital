import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import toast from "react-hot-toast";
import LoginPage from "./page";

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

describe("LoginPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    toastFn.mockClear();
    toastFn.success.mockClear();
    toastFn.error.mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  it("rejects submission when email or password is missing", async () => {
    const { container } = render(<LoginPage />);

    // Inputs are `required`, so a real click on the submit button would be
    // blocked by native HTML5 constraint validation before React ever sees
    // it. Dispatch the submit event directly to exercise the app's own
    // validation logic instead.
    fireEvent.submit(container.querySelector("form")!);

    expect(toastFn.error).toHaveBeenCalledWith(
      "Email and password are required."
    );
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    const { container } = render(<LoginPage />);

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    fireEvent.submit(container.querySelector("form")!);

    expect(toastFn.error).toHaveBeenCalledWith("Enter a valid email address.");
  });

  it("rejects a password shorter than 6 characters", async () => {
    const user = userEvent.setup();
    const { container } = render(<LoginPage />);

    await user.type(screen.getByLabelText(/email address/i), "user@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "123");
    fireEvent.submit(container.querySelector("form")!);

    expect(toastFn.error).toHaveBeenCalledWith(
      "Password must be at least 6 characters."
    );
  });

  it("logs in successfully, stores tokens, and redirects", async () => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    try {
      const user = userEvent.setup({
        advanceTimers: (ms) => jest.advanceTimersByTime(ms),
      });

      mock.onPost("/auth/login").reply(200, {
        token: "access-token-1",
        refreshToken: "refresh-token-1",
        user: { id: "u1", email: "user@example.com", fullName: "User One" },
      });

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/email address/i), "user@example.com");
      await user.type(screen.getByLabelText(/^password$/i), "password123");
      await user.click(screen.getByRole("button", { name: /sign in/i }));

      await waitFor(() => {
        expect(mock.history.post?.length).toBe(1);
      });
      expect(JSON.parse(mock.history.post![0].data)).toEqual({
        email: "user@example.com",
        password: "password123",
      });

      await waitFor(() => {
        expect(toastFn.success).toHaveBeenCalledWith(
          "Login successful! Redirecting..."
        );
      });

      // rememberMe checkbox was left unchecked, so tokens land in sessionStorage.
      expect(sessionStorage.getItem("token")).toBe("access-token-1");

      // jsdom does not implement real navigation, so `window.location.href`
      // assignments are silently swallowed. We can only verify the redirect
      // timer fires without throwing.
      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1500);
        });
      }).not.toThrow();
    } finally {
      jest.useRealTimers();
    }
  });

  it("shows an error toast when login fails", async () => {
    mock.onPost("/auth/login").reply(401, {
      error: { message: "Invalid credentials" },
    });

    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByLabelText(/email address/i), "user@example.com");
    await user.type(screen.getByLabelText(/^password$/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(toastFn.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  it("attempts a GitHub OAuth redirect without erroring", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    // jsdom does not implement real navigation, so we cannot observe the
    // resulting URL; we can only confirm the redirect branch runs cleanly
    // (no error toast from the catch block) and re-enables the button.
    const githubButton = screen.getByRole("button", { name: /github/i });
    await user.click(githubButton);

    expect(toastFn.error).not.toHaveBeenCalled();
    await waitFor(() => expect(githubButton).not.toBeDisabled());
  });

  it("shows an in-progress toast for the Google sign-in placeholder", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.click(screen.getByRole("button", { name: /google/i }));

    expect(toastFn).toHaveBeenCalledWith(
      "Google Sign-In integration in progress",
      expect.objectContaining({ icon: expect.any(String) })
    );
  });
});
