import { renderHook, waitFor, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { useAdminSettings } from "./useAdminSettings";

describe("useAdminSettings", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    jest.spyOn(toast, "success").mockImplementation(() => "");
    jest.spyOn(toast, "error").mockImplementation(() => "");
  });

  afterEach(() => {
    mock.restore();
    jest.restoreAllMocks();
  });

  it("loads settings from the API and merges them into defaults", async () => {
    mock.onGet("/admin/settings").reply(200, {
      notifications: { email: false, sms: true, push: true },
      security: { twoFactor: false, sessionTimeout: 60, ipWhitelist: true },
      platform: {
        maintenanceMode: true,
        registrationEnabled: false,
        apiEnabled: true,
      },
      integrations: { stripe: false, intercom: true, analytics: false },
    });

    const { result } = renderHook(() => useAdminSettings());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.settings.security.sessionTimeout).toBe(60);
    expect(result.current.settings.notifications.email).toBe(false);
  });

  it("shows an error toast when settings fail to load", async () => {
    mock.onGet("/admin/settings").reply(500);

    const { result } = renderHook(() => useAdminSettings());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(toast.error).toHaveBeenCalledWith("Failed to load settings");
  });

  it("toggles a setting and saves all categories with the right key/value", async () => {
    mock.onGet("/admin/settings").reply(200, {
      notifications: { email: true, sms: false, push: true },
      security: { twoFactor: true, sessionTimeout: 30, ipWhitelist: false },
      platform: {
        maintenanceMode: false,
        registrationEnabled: true,
        apiEnabled: true,
      },
      integrations: { stripe: true, intercom: true, analytics: true },
    });
    mock.onPut("/admin/settings").reply(200, {});

    const { result } = renderHook(() => useAdminSettings());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleToggle("notifications", "email");
    });

    expect(result.current.settings.notifications.email).toBe(false);

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toast.success).toHaveBeenCalledWith("Settings saved");
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
      platform: {
        maintenanceMode: false,
        registrationEnabled: true,
        apiEnabled: true,
      },
      integrations: { stripe: true, intercom: true, analytics: true },
    });
    mock.onPut("/admin/settings").reply(500);

    const { result } = renderHook(() => useAdminSettings());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to save settings");
    expect(result.current.saving).toBe(false);
  });

  it("updates a numeric setting", async () => {
    mock.onGet("/admin/settings").reply(200, {
      notifications: { email: true, sms: false, push: true },
      security: { twoFactor: true, sessionTimeout: 30, ipWhitelist: false },
      platform: {
        maintenanceMode: false,
        registrationEnabled: true,
        apiEnabled: true,
      },
      integrations: { stripe: true, intercom: true, analytics: true },
    });

    const { result } = renderHook(() => useAdminSettings());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleNumberChange("security", "sessionTimeout", 90);
    });

    expect(result.current.settings.security.sessionTimeout).toBe(90);
  });
});
