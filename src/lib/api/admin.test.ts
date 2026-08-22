import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { admin } from "./admin";

describe("admin api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("users", () => {
    it("getAll sends params and resolves with data", async () => {
      const users = [{ id: "1", email: "a@example.com" }];
      mock.onGet("/admin/users").reply(200, { users });

      const response = await admin.users.getAll({
        status: "active",
        role: "client",
        search: "a",
        page: 1,
        limit: 10,
      });

      expect(response.data).toEqual({ users });
      expect(mock.history.get[0].params).toEqual({
        status: "active",
        role: "client",
        search: "a",
        page: 1,
        limit: 10,
      });
    });

    it("getAll works without params", async () => {
      mock.onGet("/admin/users").reply(200, { users: [] });

      const response = await admin.users.getAll();

      expect(response.data).toEqual({ users: [] });
    });

    it("create posts new user data", async () => {
      const data = {
        email: "new@example.com",
        password: "secret123",
        fullName: "New User",
        role: "client",
      };
      mock.onPost("/admin/users").reply(201, { id: "u1" });

      const response = await admin.users.create(data);

      expect(response.data).toEqual({ id: "u1" });
      expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
    });

    it("update puts data to the user's url", async () => {
      const data = { fullName: "Updated Name" };
      mock.onPut("/admin/users/u1").reply(200, { id: "u1", ...data });

      const response = await admin.users.update("u1", data);

      expect(response.data).toEqual({ id: "u1", ...data });
      expect(JSON.parse(mock.history.put[0].data)).toEqual(data);
    });

    it("suspend posts suspend action to the user's url", async () => {
      const data = { action: "suspend", reason: "fraud" };
      mock.onPost("/admin/users/u1/suspend").reply(200, { success: true });

      const response = await admin.users.suspend("u1", data);

      expect(response.data).toEqual({ success: true });
      expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
    });

    it("delete removes the user by id", async () => {
      mock.onDelete("/admin/users/u1").reply(204);

      const response = await admin.users.delete("u1");

      expect(response.status).toBe(204);
      expect(mock.history.delete[0].url).toBe("/admin/users/u1");
    });
  });

  describe("kyc", () => {
    it("getAll sends params and resolves with data", async () => {
      mock.onGet("/kyc").reply(200, { records: [] });

      const response = await admin.kyc.getAll({
        status: "pending",
        page: 1,
        limit: 20,
      });

      expect(response.data).toEqual({ records: [] });
      expect(mock.history.get[0].params).toEqual({
        status: "pending",
        page: 1,
        limit: 20,
      });
    });

    it("update puts status and notes for a kyc record", async () => {
      const data = { status: "approved", notes: "looks good" };
      mock.onPut("/kyc/k1").reply(200, { id: "k1", ...data });

      const response = await admin.kyc.update("k1", data);

      expect(response.data).toEqual({ id: "k1", ...data });
      expect(JSON.parse(mock.history.put[0].data)).toEqual(data);
    });
  });

  describe("settings", () => {
    it("get retrieves admin settings", async () => {
      mock.onGet("/admin/settings").reply(200, { maintenanceMode: false });

      const response = await admin.settings.get();

      expect(response.data).toEqual({ maintenanceMode: false });
    });

    it("update puts key/value pair", async () => {
      mock.onPut("/admin/settings").reply(200, { success: true });

      const response = await admin.settings.update("maintenanceMode", {
        enabled: true,
      });

      expect(response.data).toEqual({ success: true });
      expect(JSON.parse(mock.history.put[0].data)).toEqual({
        key: "maintenanceMode",
        value: { enabled: true },
      });
    });
  });

  describe("managers", () => {
    it("getAll resolves with managers list", async () => {
      const managers = [
        {
          id: "m1",
          email: "m@example.com",
          fullName: "Manager One",
          status: "active" as const,
          clientCount: 3,
          joinDate: "2024-01-01",
        },
      ];
      mock.onGet("/admin/managers").reply(200, { managers });

      const response = await admin.managers.getAll();

      expect(response.data).toEqual({ managers });
    });

    it("create posts manager data", async () => {
      const data = {
        email: "m@example.com",
        password: "pw123456",
        fullName: "Manager",
      };
      mock.onPost("/admin/managers").reply(201, { id: "m1" });

      const response = await admin.managers.create(data);

      expect(response.data).toEqual({ id: "m1" });
      expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
    });

    it("update puts manager updates by id", async () => {
      const data = { fullName: "Updated", status: "inactive" as const };
      mock.onPut("/admin/managers/m1").reply(200, { id: "m1", ...data });

      const response = await admin.managers.update("m1", data);

      expect(response.data).toEqual({ id: "m1", ...data });
      expect(JSON.parse(mock.history.put[0].data)).toEqual(data);
    });

    it("getClients fetches clients for a manager", async () => {
      const payload = {
        managerId: "m1",
        managerName: "Manager One",
        clients: [],
      };
      mock.onGet("/admin/managers/m1/clients").reply(200, payload);

      const response = await admin.managers.getClients("m1");

      expect(response.data).toEqual(payload);
    });

    it("assignClient posts email/notes to assign a client", async () => {
      const data = { email: "client@example.com", notes: "vip" };
      mock
        .onPost("/admin/managers/m1/clients")
        .reply(201, { assignmentId: "a1" });

      const response = await admin.managers.assignClient("m1", data);

      expect(response.data).toEqual({ assignmentId: "a1" });
      expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
    });

    it("unassignClient deletes the client assignment", async () => {
      mock.onDelete("/admin/managers/m1/clients/c1").reply(204);

      const response = await admin.managers.unassignClient("m1", "c1");

      expect(response.status).toBe(204);
      expect(mock.history.delete[0].url).toBe("/admin/managers/m1/clients/c1");
    });
  });

  describe("wallets", () => {
    it("creditUser posts amount/description to credit a user's wallet", async () => {
      const data = { amount: 100, description: "bonus" };
      const responseData = {
        message: "credited",
        availableBalance: 500,
        amount: 100,
      };
      mock.onPost("/admin/wallets/users/u1/credit").reply(200, responseData);

      const response = await admin.wallets.creditUser("u1", data);

      expect(response.data).toEqual(responseData);
      expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
    });

    it("getPendingWithdrawals resolves with pending withdrawals list", async () => {
      const payload = { withdrawals: [], total: 0 };
      mock.onGet("/admin/wallets/withdrawals/pending").reply(200, payload);

      const response = await admin.wallets.getPendingWithdrawals();

      expect(response.data).toEqual(payload);
    });

    it("approveWithdrawal patches the withdrawal's approve endpoint", async () => {
      mock
        .onPatch("/admin/wallets/withdrawals/t1/approve")
        .reply(200, { success: true });

      const response = await admin.wallets.approveWithdrawal("t1");

      expect(response.data).toEqual({ success: true });
      expect(mock.history.patch[0].url).toBe(
        "/admin/wallets/withdrawals/t1/approve",
      );
    });

    it("rejectWithdrawal patches the withdrawal's reject endpoint with a reason", async () => {
      const data = { reason: "suspicious" };
      mock
        .onPatch("/admin/wallets/withdrawals/t1/reject")
        .reply(200, { success: true });

      const response = await admin.wallets.rejectWithdrawal("t1", data);

      expect(response.data).toEqual({ success: true });
      expect(JSON.parse(mock.history.patch[0].data)).toEqual(data);
    });
  });
});
