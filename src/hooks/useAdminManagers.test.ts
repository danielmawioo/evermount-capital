import { renderHook, waitFor, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { useAdminManagers } from "./useAdminManagers";

const MANAGER = {
  id: "m1",
  email: "manager1@evermount.co",
  fullName: "Manager One",
  status: "active" as const,
  clientCount: 2,
  joinDate: new Date().toISOString(),
};

const CLIENT = {
  assignmentId: "a1",
  clientId: "c1",
  email: "client1@evermount.co",
  fullName: "Client One",
  kycStatus: "VERIFIED",
  availableBalance: 500,
  currency: "USD",
  assignedAt: new Date().toISOString(),
};

describe("useAdminManagers", () => {
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

  it("loads managers on mount and exposes them via filteredManagers", async () => {
    mock.onGet("/admin/managers").reply(200, { managers: [MANAGER] });

    const { result } = renderHook(() => useAdminManagers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.filteredManagers).toEqual([MANAGER]);
  });

  it("creates a manager and reloads the list", async () => {
    mock.onGet("/admin/managers").reply(200, { managers: [] });
    mock.onPost("/admin/managers").reply(201, {});

    const { result } = renderHook(() => useAdminManagers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setForm({
        fullName: "New Manager",
        email: "new@evermount.co",
        password: "longenough123",
      });
    });

    mock.onGet("/admin/managers").reply(200, { managers: [MANAGER] });

    await act(async () => {
      await result.current.handleCreate({
        preventDefault: () => {},
      } as unknown as React.FormEvent);
    });

    expect(
      mock.history.post.filter((r) => r.url === "/admin/managers"),
    ).toHaveLength(1);
    expect(toast.success).toHaveBeenCalledWith("Portfolio manager created");
    await waitFor(() =>
      expect(result.current.filteredManagers).toEqual([MANAGER]),
    );
  });

  it("credits a client's wallet and refreshes that manager's clients", async () => {
    mock.onGet("/admin/managers").reply(200, { managers: [MANAGER] });
    mock.onGet("/admin/managers/m1/clients").reply(200, {
      managerId: "m1",
      managerName: "Manager One",
      clients: [CLIENT],
    });
    mock.onPost("/admin/wallets/users/c1/credit").reply(200, {});

    const { result } = renderHook(() => useAdminManagers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.openManageClients(MANAGER);
    });
    expect(result.current.managerClients).toEqual([CLIENT]);

    act(() => {
      result.current.setCreditClient(CLIENT);
      result.current.setCreditAmount("100");
    });

    await act(async () => {
      await result.current.handleCreditClient({
        preventDefault: () => {},
      } as unknown as React.FormEvent);
    });

    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/wallets/users/c1/credit")!
        .data,
    );
    expect(payload).toEqual({
      amount: 100,
      description: "Admin credit for Client One",
    });
    expect(toast.success).toHaveBeenCalledWith("Credited $100");
    expect(result.current.creditClient).toBeNull();
  });

  it("shows an error toast when loading managers fails", async () => {
    mock.onGet("/admin/managers").reply(500);

    const { result } = renderHook(() => useAdminManagers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to load portfolio managers",
    );
    expect(result.current.filteredManagers).toEqual([]);
  });
});
