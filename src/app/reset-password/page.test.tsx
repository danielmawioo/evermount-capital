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
import ResetPasswordPage from "./page";

async function fillOtp(user: ReturnType<typeof userEvent.setup>, otp: string) {
  const otpInputs = screen.getAllByDisplayValue("");
  // The OTP boxes are the 6 single-character text inputs; filter by maxLength.
  const boxes = screen
    .getAllByRole("textbox")
    .filter((el) => el.getAttribute("maxlength") === "1");
  for (let i = 0; i < otp.length; i++) {
    await user.type(boxes[i], otp[i]);
  }
  return otpInputs;
}

describe("ResetPasswordPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  function getInputs() {
    const email = screen.getByPlaceholderText("example@gmail.com");
    const newPassword = screen.getByPlaceholderText("New Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm New Password");
    return { email, newPassword, confirmPassword };
  }

  it("shows a validation error when required fields are missing", () => {
    render(<ResetPasswordPage />);

    fireEvent.submit(
      screen.getByRole("button", { name: /update password/i }).closest("form")!,
    );

    expect(screen.getByText("Please fill in all fields.")).toBeInTheDocument();
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("shows a validation error when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const { email, newPassword, confirmPassword } = getInputs();
    await user.type(email, "user@example.com");
    await fillOtp(user, "123456");
    await user.type(newPassword, "NewPass1!");
    await user.type(confirmPassword, "Mismatch1!");

    fireEvent.submit(
      screen.getByRole("button", { name: /update password/i }).closest("form")!,
    );

    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("resets the password and redirects to login on success", async () => {
    jest.useFakeTimers({ legacyFakeTimers: false });
    try {
      const user = userEvent.setup({
        advanceTimers: (ms) => jest.advanceTimersByTime(ms),
      });

      mock.onPost("/auth/reset-password").reply(200, {});

      render(<ResetPasswordPage />);

      const { email, newPassword, confirmPassword } = getInputs();
      await user.type(email, "user@example.com");
      await fillOtp(user, "123456");
      await user.type(newPassword, "NewPass1!");
      await user.type(confirmPassword, "NewPass1!");

      await user.click(
        screen.getByRole("button", { name: /update password/i }),
      );

      await waitFor(() => expect(mock.history.post?.length).toBe(1));
      expect(JSON.parse(mock.history.post![0].data)).toEqual({
        email: "user@example.com",
        otp: "123456",
        newPassword: "NewPass1!",
      });

      expect(
        await screen.findByText(
          "Password updated successfully! Please log in.",
        ),
      ).toBeInTheDocument();

      expect(() => {
        act(() => {
          jest.advanceTimersByTime(2000);
        });
      }).not.toThrow();
    } finally {
      jest.useRealTimers();
    }
  });

  it("shows an error message when the reset request fails", async () => {
    mock.onPost("/auth/reset-password").reply(400, {
      error: { message: "Invalid or expired OTP" },
    });

    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const { email, newPassword, confirmPassword } = getInputs();
    await user.type(email, "user@example.com");
    await fillOtp(user, "123456");
    await user.type(newPassword, "NewPass1!");
    await user.type(confirmPassword, "NewPass1!");

    await user.click(screen.getByRole("button", { name: /update password/i }));

    expect(
      await screen.findByText("Invalid or expired OTP"),
    ).toBeInTheDocument();
  });

  it("resends the OTP when requested", async () => {
    mock.onPost("/auth/send-reset-password").reply(200, {});

    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    const { email } = getInputs();
    await user.type(email, "user@example.com");
    await user.click(screen.getByRole("button", { name: /resend/i }));

    await waitFor(() => expect(mock.history.post?.length).toBe(1));
    expect(JSON.parse(mock.history.post![0].data)).toEqual({
      email: "user@example.com",
    });
    expect(
      await screen.findByText("OTP resent to your email."),
    ).toBeInTheDocument();
  });

  it("shows an error when resending without an email", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    await user.click(screen.getByRole("button", { name: /resend/i }));

    expect(screen.getByText("Enter your email first.")).toBeInTheDocument();
    expect(mock.history.post?.length ?? 0).toBe(0);
  });
});
