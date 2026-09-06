import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import toast from "react-hot-toast";
import RegisterPage from "./page";

jest.mock("@/app/components/TranslateTree", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

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

async function fillRequiredFields(
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }> = {},
) {
  const {
    firstName = "Jane",
    lastName = "Doe",
    email = "jane@example.com",
    password = "StrongPass1!",
  } = overrides;

  await user.type(screen.getByLabelText(/first name/i), firstName);
  await user.type(screen.getByLabelText(/last name/i), lastName);
  await user.type(screen.getByLabelText(/email address/i), email);
  await user.type(screen.getByLabelText(/^password$/i), password);
}

describe("RegisterPage", () => {
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

  it("blocks submission when terms are not accepted", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await fillRequiredFields(user);
    fireEvent.submit(
      screen.getByRole("button", { name: /create account/i }).closest("form")!,
    );

    expect(toastFn.error).toHaveBeenCalledWith(
      "Please accept the Terms and Conditions.",
    );
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("blocks submission when the password is weak", async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    await fillRequiredFields(user, { password: "weak" });
    await user.click(screen.getByRole("checkbox"));
    fireEvent.submit(
      screen.getByRole("button", { name: /create account/i }).closest("form")!,
    );

    expect(toastFn.error).toHaveBeenCalledWith(
      "Password is too weak. Make it stronger.",
    );
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("registers, stores tokens, and redirects to KYC when the API returns tokens", async () => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    try {
      const user = userEvent.setup({
        advanceTimers: (ms) => jest.advanceTimersByTime(ms),
      });

      mock.onPost("/auth/register").reply(200, {
        token: "access-token-1",
        refreshToken: "refresh-token-1",
        userId: "user-1",
      });

      render(<RegisterPage />);

      await fillRequiredFields(user);
      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() => expect(mock.history.post?.length).toBe(1));
      expect(JSON.parse(mock.history.post![0].data)).toEqual({
        email: "jane@example.com",
        password: "StrongPass1!",
        fullName: "Jane Doe",
      });

      await waitFor(() =>
        expect(toastFn.success).toHaveBeenCalledWith(
          "Account created! Redirecting to your dashboard...",
        ),
      );

      expect(localStorage.getItem("token")).toBe("access-token-1");
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      expect(storedUser).toMatchObject({
        id: "user-1",
        email: "jane@example.com",
        fullName: "Jane Doe",
        role: "INVESTOR",
        isVerified: false,
      });

      expect(() => {
        act(() => {
          jest.advanceTimersByTime(1500);
        });
      }).not.toThrow();
    } finally {
      jest.useRealTimers();
    }
  });

  it("shows a verify-email message and redirects to login when no tokens are returned", async () => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    try {
      const user = userEvent.setup({
        advanceTimers: (ms) => jest.advanceTimersByTime(ms),
      });

      mock.onPost("/auth/register").reply(200, {});

      render(<RegisterPage />);

      await fillRequiredFields(user);
      await user.click(screen.getByRole("checkbox"));
      await user.click(screen.getByRole("button", { name: /create account/i }));

      await waitFor(() =>
        expect(toastFn.success).toHaveBeenCalledWith(
          "Account created! Please check your email to verify.",
        ),
      );

      expect(localStorage.getItem("token")).toBeNull();

      expect(() => {
        act(() => {
          jest.advanceTimersByTime(2000);
        });
      }).not.toThrow();
    } finally {
      jest.useRealTimers();
    }
  });

  it("shows an error toast when registration fails", async () => {
    mock.onPost("/auth/register").reply(400, {
      error: { message: "Email already in use" },
    });

    const user = userEvent.setup();
    render(<RegisterPage />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() =>
      expect(toastFn.error).toHaveBeenCalledWith("Email already in use"),
    );
  });

  it("does not offer social sign-up", () => {
    render(<RegisterPage />);
    expect(
      screen.queryByRole("button", { name: /github/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /google/i }),
    ).not.toBeInTheDocument();
  });
});
