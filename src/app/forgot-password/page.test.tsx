import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import ForgotPasswordPage from "./page";

describe("ForgotPasswordPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("shows a validation error when the email field is empty", () => {
    render(<ForgotPasswordPage />);

    fireEvent.submit(screen.getByRole("button", { name: /send request/i }).closest("form")!);

    expect(
      screen.getByText("Please enter your email address.")
    ).toBeInTheDocument();
    expect(mock.history.post?.length ?? 0).toBe(0);
  });

  it("sends the reset password request and shows a success message", async () => {
    mock.onPost("/auth/send-reset-password").reply(200, {});

    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText(/email address/i), "user@example.com");
    await user.click(screen.getByRole("button", { name: /send request/i }));

    await waitFor(() => expect(mock.history.post?.length).toBe(1));
    expect(JSON.parse(mock.history.post![0].data)).toEqual({
      email: "user@example.com",
    });

    expect(
      await screen.findByText("OTP sent to your email. Please check your inbox.")
    ).toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    mock.onPost("/auth/send-reset-password").reply(500, {
      message: "Server error",
    });

    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText(/email address/i), "user@example.com");
    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(await screen.findByText("Server error")).toBeInTheDocument();
  });
});
