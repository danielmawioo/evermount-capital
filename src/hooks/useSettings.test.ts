import { renderHook, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { useSettings } from "./useSettings";

describe("useSettings", () => {
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

  it("loads profile and investment preferences", async () => {
    mock.onGet("/users/profile").reply(200, {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "0700000000",
    });
    mock.onGet("/investments/preferences").reply(200, {
      lockInMonths: 12,
      riskTolerance: "HIGH",
      reinvestProfits: false,
    });

    const { result } = renderHook(() => useSettings());

    await act(async () => {
      await result.current.loadProfile();
      await result.current.loadInvestmentPrefs();
    });

    expect(result.current.formData.fullName).toBe("Jane Doe");
    expect(result.current.formData.phone).toBe("0700000000");
    expect(result.current.investmentPrefs).toEqual({
      lockInMonths: 12,
      riskTolerance: "HIGH",
      reinvestProfits: false,
    });
    expect(result.current.profileLoading).toBe(false);
    expect(result.current.prefsLoading).toBe(false);
  });

  it("saves updated profile information", async () => {
    mock.onGet("/users/profile").reply(200, {});
    mock.onGet("/investments/preferences").reply(200, {});
    mock.onPut("/users/profile").reply(200, {});

    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setFormData({
        ...result.current.formData,
        fullName: "Janet Doe",
      });
    });

    await act(async () => {
      await result.current.handleProfileUpdate({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(
      mock.history.put.filter((r) => r.url === "/users/profile"),
    ).toHaveLength(1);
    const payload = JSON.parse(
      mock.history.put.find((r) => r.url === "/users/profile")!.data,
    );
    expect(payload.fullName).toBe("Janet Doe");
    expect(toast.success).toHaveBeenCalledWith("Profile updated successfully");
    expect(result.current.loading).toBe(false);
  });

  it("shows an error toast when saving investment preferences fails", async () => {
    mock.onGet("/users/profile").reply(200, {});
    mock.onGet("/investments/preferences").reply(200, {});
    mock.onPut("/investments/preferences").reply(500);

    const { result } = renderHook(() => useSettings());

    await act(async () => {
      await result.current.handleInvestmentPrefsSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to save preferences");
    expect(result.current.loading).toBe(false);
  });

  it("rejects a password change when the confirmation does not match", async () => {
    mock.onGet("/users/profile").reply(200, {});
    mock.onGet("/investments/preferences").reply(200, {});

    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.setPasswordData({
        currentPassword: "old-password",
        newPassword: "password1",
        confirmPassword: "password2",
      });
    });

    await act(async () => {
      await result.current.handlePasswordChange({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
    expect(
      mock.history.put.filter((r) => r.url === "/users/change-password"),
    ).toHaveLength(0);
  });
});
