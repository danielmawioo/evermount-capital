import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import AdminSecurityPage from "./page";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

describe("AdminSecurityPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  it("shows MFA disabled status with a setup button", async () => {
    mock.onGet("/admin/security/mfa/status").reply(200, {
      mfaEnabled: false,
      requiredForRole: true,
    });

    render(<AdminSecurityPage />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Disabled")).toBeInTheDocument());
    expect(screen.getByRole("button", { name: /Set up MFA/i })).toBeInTheDocument();
  });

  it("shows an error toast when the status call fails", async () => {
    mock.onGet("/admin/security/mfa/status").reply(500);

    render(<AdminSecurityPage />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to load MFA status")
    );
  });

  it("runs setup, then enables MFA with the entered token", async () => {
    mock.onGet("/admin/security/mfa/status").reply(200, {
      mfaEnabled: false,
      requiredForRole: true,
    });
    mock.onPost("/admin/security/mfa/setup").reply(200, {
      secret: "SECRET123",
      otpauthUrl: "otpauth://totp/Evermount:admin?secret=SECRET123",
    });
    mock.onPost("/admin/security/mfa/enable").reply(200, {});

    const user = userEvent.setup();
    render(<AdminSecurityPage />);

    await waitFor(() => expect(screen.getByText("Disabled")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /Set up MFA/i }));

    await waitFor(() => expect(screen.getByText("SECRET123")).toBeInTheDocument());
    expect(toast.success).toHaveBeenCalledWith(
      "Scan the secret with your authenticator app"
    );

    const input = screen.getByPlaceholderText("6-digit code");
    await user.type(input, "123456");

    mock.onGet("/admin/security/mfa/status").reply(200, {
      mfaEnabled: true,
      requiredForRole: true,
    });

    await user.click(screen.getByRole("button", { name: /^Enable MFA$/i }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("MFA enabled")
    );
    const enableCall = mock.history.post.find(
      (r) => r.url === "/admin/security/mfa/enable"
    );
    expect(JSON.parse(enableCall?.data)).toEqual({ token: "123456" });
  });

  it("shows an error toast when enabling with an invalid token", async () => {
    mock.onGet("/admin/security/mfa/status").reply(200, {
      mfaEnabled: false,
      requiredForRole: true,
    });
    mock.onPost("/admin/security/mfa/setup").reply(200, {
      secret: "SECRET123",
      otpauthUrl: "otpauth://totp/Evermount:admin?secret=SECRET123",
    });
    mock.onPost("/admin/security/mfa/enable").reply(400);

    const user = userEvent.setup();
    render(<AdminSecurityPage />);

    await waitFor(() => expect(screen.getByText("Disabled")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: /Set up MFA/i }));
    await waitFor(() => expect(screen.getByText("SECRET123")).toBeInTheDocument());

    const input = screen.getByPlaceholderText("6-digit code");
    await user.type(input, "000000");
    await user.click(screen.getByRole("button", { name: /^Enable MFA$/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Invalid token — could not enable MFA"
      )
    );
  });

  it("disables MFA with the entered token when already enabled", async () => {
    mock.onGet("/admin/security/mfa/status").reply(200, {
      mfaEnabled: true,
      requiredForRole: true,
    });
    mock.onPost("/admin/security/mfa/disable").reply(200, {});

    const user = userEvent.setup();
    render(<AdminSecurityPage />);

    await waitFor(() => expect(screen.getByText("Enabled")).toBeInTheDocument());

    const input = screen.getByPlaceholderText("6-digit code to disable");
    await user.type(input, "654321");

    mock.onGet("/admin/security/mfa/status").reply(200, {
      mfaEnabled: false,
      requiredForRole: true,
    });

    await user.click(screen.getByRole("button", { name: /Disable MFA/i }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("MFA disabled")
    );
    const disableCall = mock.history.post.find(
      (r) => r.url === "/admin/security/mfa/disable"
    );
    expect(JSON.parse(disableCall?.data)).toEqual({ token: "654321" });
  });
});
