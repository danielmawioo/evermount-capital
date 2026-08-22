import { renderHook, act } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import { useAdminUsers } from "./useAdminUsers";

const USER = {
  id: "u1",
  email: "investor@evermount.co",
  fullName: "Investor One",
  role: "INVESTOR",
  status: "active",
  kycStatus: "VERIFIED",
  createdAt: new Date().toISOString(),
  totalDeposits: 1000,
};

describe("useAdminUsers", () => {
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

  it("loads users and total count", async () => {
    mock.onGet("/admin/users").reply(200, { users: [USER], total: 1 });

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.loadUsers();
    });

    expect(result.current.users).toEqual([USER]);
    expect(result.current.total).toBe(1);
    expect(result.current.loading).toBe(false);
  });

  it("shows an error toast when loading users fails", async () => {
    mock.onGet("/admin/users").reply(500);

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.loadUsers();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to load users");
  });

  it("creates a user and reloads the list", async () => {
    mock
      .onGet("/admin/users")
      .reply(200, { users: [USER], total: 1 });
    mock.onPost("/admin/users").reply(201, {});

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.loadUsers();
    });

    act(() => {
      result.current.setForm({
        fullName: "New Person",
        email: "new@evermount.co",
        password: "secret123",
        role: "INVESTOR",
      });
    });

    await act(async () => {
      await result.current.handleCreate({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(
      mock.history.post.filter((r) => r.url === "/admin/users")
    ).toHaveLength(1);
    const payload = JSON.parse(
      mock.history.post.find((r) => r.url === "/admin/users")!.data
    );
    expect(payload).toEqual({
      fullName: "New Person",
      email: "new@evermount.co",
      password: "secret123",
      role: "INVESTOR",
    });
    expect(toast.success).toHaveBeenCalledWith("User created");
    expect(result.current.showAddModal).toBe(false);
  });

  it("updates a user's name and role", async () => {
    mock.onGet("/admin/users").reply(200, { users: [USER], total: 1 });
    mock.onPut("/admin/users/u1").reply(200, {});

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.loadUsers();
    });

    act(() => {
      result.current.setEditUser(USER);
      result.current.setEditForm({ fullName: "Updated Name", role: "MANAGER" });
    });

    await act(async () => {
      await result.current.handleUpdateUser({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(
      mock.history.put.filter((r) => r.url === "/admin/users/u1")
    ).toHaveLength(1);
    const payload = JSON.parse(
      mock.history.put.find((r) => r.url === "/admin/users/u1")!.data
    );
    expect(payload).toEqual({ fullName: "Updated Name", role: "MANAGER" });
    expect(toast.success).toHaveBeenCalledWith("User updated");
    expect(result.current.editUser).toBeNull();
  });

  it("shows an error toast when crediting a wallet fails", async () => {
    mock.onGet("/admin/users").reply(200, { users: [USER], total: 1 });
    mock.onPost("/admin/wallets/users/u1/credit").reply(500);

    const { result } = renderHook(() => useAdminUsers());

    await act(async () => {
      await result.current.loadUsers();
    });

    act(() => {
      result.current.setCreditUser(USER);
      result.current.setCreditAmount("250");
    });

    await act(async () => {
      await result.current.handleCreditWallet({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to credit wallet");
    expect(result.current.crediting).toBe(false);
  });
});
