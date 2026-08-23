/**
 * @jest-environment node
 *
 * MSW's Node server (`msw/node`) intercepts requests at the Node.js
 * `http`/`https` module level. jsdom's `XMLHttpRequest` (this repo's
 * default `testEnvironment`) doesn't expose the Fetch API globals
 * (`Request`/`Response`) that `msw/node` needs, so this one file opts into
 * the plain Node test environment — which also means axios uses its
 * `http` adapter here instead of the `xhr` adapter, a closer match to how
 * requests actually flow through `msw/node` in production Node contexts.
 */
import { server } from "@/mocks/server";
import { api } from "./api-client";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api.admin", () => {
  it("users.getAll resolves with an empty users fixture", async () => {
    const response = await api.admin.users.getAll({
      status: "active",
      page: 1,
      limit: 20,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ users: [] });
  });

  it("users.create resolves with the created admin user echoed back", async () => {
    const response = await api.admin.users.create({
      email: "admin-created@example.com",
      password: "password123",
      fullName: "Admin Created",
      role: "client",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "admin-user-mock-1",
      email: "admin-created@example.com",
    });
  });

  it("users.update resolves with the user id and body echoed back", async () => {
    const response = await api.admin.users.update("user-1", {
      fullName: "Renamed",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "user-1", fullName: "Renamed" });
  });

  it("users.suspend resolves with success:true", async () => {
    const response = await api.admin.users.suspend("user-1", {
      action: "suspend",
      reason: "fraud review",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("users.delete resolves with a 204 No Content", async () => {
    const response = await api.admin.users.delete("user-1");
    expect(response.status).toBe(204);
  });

  it("kyc.getAll resolves with an empty records fixture", async () => {
    const response = await api.admin.kyc.getAll({ status: "pending" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ records: [] });
  });

  it("kyc.update resolves with the kyc id and body echoed back", async () => {
    const response = await api.admin.kyc.update("kyc-1", {
      status: "approved",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "kyc-1", status: "approved" });
  });

  it("settings.get resolves with the mock settings fixture", async () => {
    const response = await api.admin.settings.get();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ maintenanceMode: false });
  });

  it("settings.update resolves with success:true", async () => {
    const response = await api.admin.settings.update("maintenanceMode", {
      enabled: true,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("managers.getAll resolves with an empty managers fixture", async () => {
    const response = await api.admin.managers.getAll();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ managers: [] });
  });

  it("managers.create resolves with the created manager echoed back", async () => {
    const response = await api.admin.managers.create({
      email: "manager@example.com",
      password: "password123",
      fullName: "New Manager",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "manager-mock-1",
      email: "manager@example.com",
    });
  });

  it("managers.update resolves with the manager id and body echoed back", async () => {
    const response = await api.admin.managers.update("manager-1", {
      status: "inactive",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      id: "manager-1",
      status: "inactive",
    });
  });

  it("managers.getClients resolves with the manager id echoed by the mock handler", async () => {
    const response = await api.admin.managers.getClients("manager-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      managerId: "manager-1",
      managerName: "Mock Manager",
      clients: [],
    });
  });

  it("managers.assignClient resolves with the mock assignment id", async () => {
    const response = await api.admin.managers.assignClient("manager-1", {
      email: "assigned@example.com",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ assignmentId: "assignment-mock-1" });
  });

  it("managers.unassignClient resolves with a 204 No Content", async () => {
    const response = await api.admin.managers.unassignClient(
      "manager-1",
      "client-1",
    );
    expect(response.status).toBe(204);
  });

  it("wallets.creditUser resolves with the credited balance computed by the mock handler", async () => {
    const response = await api.admin.wallets.creditUser("user-1", {
      amount: 250,
      description: "bonus",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "credited",
      availableBalance: 5250,
      amount: 250,
    });
  });

  it("wallets.getPendingWithdrawals resolves with an empty withdrawals fixture", async () => {
    const response = await api.admin.wallets.getPendingWithdrawals();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ withdrawals: [], total: 0 });
  });

  it("wallets.approveWithdrawal resolves with success:true", async () => {
    const response = await api.admin.wallets.approveWithdrawal("txn-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("wallets.rejectWithdrawal resolves with success:true", async () => {
    const response = await api.admin.wallets.rejectWithdrawal("txn-1", {
      reason: "insufficient docs",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });
});
