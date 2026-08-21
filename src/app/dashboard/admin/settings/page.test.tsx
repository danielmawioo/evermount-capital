import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import AdminSettingsPage from "./page";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
}));

// The toggle switches render as bare <button> elements with no accessible
// text of their own — the label lives in a sibling <p>. Locate the toggle
// for a given label by walking up to the shared row and grabbing its button.
function getToggleButtonByLabel(labelText: string | RegExp) {
  const label = screen.getByText(labelText);
  const row = label.closest(".flex.items-center.justify-between");
  if (!row) throw new Error(`row not found for ${labelText}`);
  const button = row.querySelector("button");
  if (!button) throw new Error(`button not found for ${labelText}`);
  return button as HTMLButtonElement;
}

describe("AdminSettingsPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    (toast.success as jest.Mock).mockClear();
    (toast.error as jest.Mock).mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  it("loads settings from the API and merges them into defaults", async () => {
    mock.onGet("/admin/settings").reply(200, {
      notifications: { email: false, sms: true, push: true },
      security: { twoFactor: false, sessionTimeout: 60, ipWhitelist: true },
      platform: { maintenanceMode: true, registrationEnabled: false, apiEnabled: true },
      integrations: { stripe: false, intercom: true, analytics: false },
    });

    render(<AdminSettingsPage />);

    expect(
      screen.getByRole("heading", { name: /Admin Settings/i })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByDisplayValue("60")).toBeInTheDocument()
    );
  });

  it("shows an error toast when settings fail to load", async () => {
    mock.onGet("/admin/settings").reply(500);

    render(<AdminSettingsPage />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to load settings")
    );
  });

  it("toggles a setting and saves all categories with the right key/value", async () => {
    mock.onGet("/admin/settings").reply(200, {
      notifications: { email: true, sms: false, push: true },
      security: { twoFactor: true, sessionTimeout: 30, ipWhitelist: false },
      platform: { maintenanceMode: false, registrationEnabled: true, apiEnabled: true },
      integrations: { stripe: true, intercom: true, analytics: true },
    });
    mock.onPut("/admin/settings").reply(200, {});

    const user = userEvent.setup();
    render(<AdminSettingsPage />);

    await waitFor(() => expect(mock.history.get.length).toBe(1));

    await user.click(getToggleButtonByLabel("Email Notifications"));

    await user.click(screen.getByRole("button", { name: /Save All Changes/i }));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Settings saved")
    );

    expect(mock.history.put.length).toBe(4);
    const notifCall = mock.history.put.find((r) => {
      const body = JSON.parse(r.data);
      return body.key === "notifications";
    });
    const notifBody = JSON.parse(notifCall?.data);
    expect(notifBody).toEqual({
      key: "notifications",
      value: { email: false, sms: false, push: true },
    });
  });

  it("shows an error toast when saving fails", async () => {
    mock.onGet("/admin/settings").reply(200, {
      notifications: { email: true, sms: false, push: true },
      security: { twoFactor: true, sessionTimeout: 30, ipWhitelist: false },
      platform: { maintenanceMode: false, registrationEnabled: true, apiEnabled: true },
      integrations: { stripe: true, intercom: true, analytics: true },
    });
    mock.onPut("/admin/settings").reply(500);

    const user = userEvent.setup();
    render(<AdminSettingsPage />);

    await waitFor(() => expect(mock.history.get.length).toBe(1));

    await user.click(screen.getByRole("button", { name: /Save All Changes/i }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to save settings")
    );
  });
});
