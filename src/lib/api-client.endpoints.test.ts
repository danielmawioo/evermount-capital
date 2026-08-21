import MockAdapter from "axios-mock-adapter";
import apiClient, { api } from "./api-client";

describe("api-client endpoint wrappers", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("api.auth.login posts credentials to /auth/login", async () => {
    mock.onPost("/auth/login").reply(200, { token: "t" });
    const res = await api.auth.login({ email: "a@b.com", password: "pw" });
    expect(res.data).toEqual({ token: "t" });
    expect(mock.history.post?.[0].url).toBe("/auth/login");
  });

  it("api.auth.register posts to /auth/register", async () => {
    mock.onPost("/auth/register").reply(201, { id: "1" });
    const res = await api.auth.register({
      email: "a@b.com",
      password: "pw",
      fullName: "A B",
    });
    expect(res.status).toBe(201);
  });

  it("api.auth.logout posts to /auth/logout", async () => {
    mock.onPost("/auth/logout").reply(200);
    const res = await api.auth.logout();
    expect(res.status).toBe(200);
  });

  it("api.users.getProfile gets /users/profile", async () => {
    mock.onGet("/users/profile").reply(200, { id: "1" });
    const res = await api.users.getProfile();
    expect(res.data).toEqual({ id: "1" });
  });

  it("api.users.updateProfile puts to /users/profile", async () => {
    mock.onPut("/users/profile").reply(200, { fullName: "New Name" });
    const res = await api.users.updateProfile({ fullName: "New Name" });
    expect(res.data).toEqual({ fullName: "New Name" });
  });

  it("api.users.bankAccounts.list gets /users/bank-accounts", async () => {
    mock.onGet("/users/bank-accounts").reply(200, []);
    const res = await api.users.bankAccounts.list();
    expect(res.data).toEqual([]);
  });

  it("api.kyc.getStatus gets /kyc/status", async () => {
    mock.onGet("/kyc/status").reply(200, { status: "PENDING" });
    const res = await api.kyc.getStatus();
    expect(res.data).toEqual({ status: "PENDING" });
  });

  it("api.wallets.getBalance gets /wallets/balance", async () => {
    mock.onGet("/wallets/balance").reply(200, { balance: 500 });
    const res = await api.wallets.getBalance();
    expect(res.data).toEqual({ balance: 500 });
  });

  it("api.wallets.getHistory gets /wallets/history with params", async () => {
    mock.onGet("/wallets/history").reply(200, { items: [] });
    const res = await api.wallets.getHistory({ page: 1 });
    expect(res.data).toEqual({ items: [] });
    expect(mock.history.get?.[0].params).toEqual({ page: 1 });
  });

  it("api.deposits.getSettlementAccount gets /deposits/settlement-account", async () => {
    mock.onGet("/deposits/settlement-account").reply(200, { bankName: "Equity" });
    const res = await api.deposits.getSettlementAccount();
    expect(res.data).toEqual({ bankName: "Equity" });
  });

  it("api.deposits.mpesa posts to /deposits/mpesa", async () => {
    mock.onPost("/deposits/mpesa").reply(200, { status: "pending" });
    const res = await api.deposits.mpesa({
      amount: 100,
      currency: "KES",
      phoneNumber: "254700000000",
    });
    expect(res.data).toEqual({ status: "pending" });
  });

  it("api.deposits.getAll gets /deposits", async () => {
    mock.onGet("/deposits").reply(200, []);
    const res = await api.deposits.getAll();
    expect(res.data).toEqual([]);
  });

  it("api.withdrawals.bank posts to /withdrawals/bank", async () => {
    mock.onPost("/withdrawals/bank").reply(200, { id: "w1" });
    const res = await api.withdrawals.bank({
      amount: 100,
      currency: "USD",
      bankAccountId: "acc1",
    });
    expect(res.data).toEqual({ id: "w1" });
  });

  it("api.withdrawals.cancel posts to /withdrawals/:id/cancel", async () => {
    mock.onPost("/withdrawals/w1/cancel").reply(200, {});
    const res = await api.withdrawals.cancel("w1");
    expect(res.status).toBe(200);
  });

  it("api.investments.getOptions gets /investments/options", async () => {
    mock.onGet("/investments/options").reply(200, []);
    const res = await api.investments.getOptions();
    expect(res.data).toEqual([]);
  });

  it("api.investments.create posts to /investments", async () => {
    mock.onPost("/investments").reply(201, { id: "inv1" });
    const res = await api.investments.create({
      investmentOptionId: "opt1",
      amount: 1000,
      strategy: "momentum",
    });
    expect(res.status).toBe(201);
  });

  it("api.portfolio.get gets /portfolio", async () => {
    mock.onGet("/portfolio").reply(200, { holdings: [] });
    const res = await api.portfolio.get();
    expect(res.data).toEqual({ holdings: [] });
  });

  it("api.portfolio.getPerformance gets /portfolio/performance", async () => {
    mock.onGet("/portfolio/performance").reply(200, { returns: [] });
    const res = await api.portfolio.getPerformance({ period: "1M" });
    expect(res.data).toEqual({ returns: [] });
  });

  it("api.transactions.getAll gets /transactions", async () => {
    mock.onGet("/transactions").reply(200, []);
    const res = await api.transactions.getAll();
    expect(res.data).toEqual([]);
  });

  it("api.transactions.getById gets /transactions/:id", async () => {
    mock.onGet("/transactions/tx1").reply(200, { id: "tx1" });
    const res = await api.transactions.getById("tx1");
    expect(res.data).toEqual({ id: "tx1" });
  });

  it("api.dashboard.getStats gets /dashboard/stats", async () => {
    mock.onGet("/dashboard/stats").reply(200, { totalUsers: 10 });
    const res = await api.dashboard.getStats();
    expect(res.data).toEqual({ totalUsers: 10 });
  });

  it("api.risk.getAssessment gets /risk/assessment", async () => {
    mock.onGet("/risk/assessment").reply(200, { score: 5 });
    const res = await api.risk.getAssessment();
    expect(res.data).toEqual({ score: 5 });
  });

  it("api.demo.getBookedSlots gets /booked-demo-slots", async () => {
    mock.onGet("/booked-demo-slots").reply(200, []);
    const res = await api.demo.getBookedSlots();
    expect(res.data).toEqual([]);
  });

  it("api.demo.book posts to /demo-booking", async () => {
    mock.onPost("/demo-booking").reply(200, { confirmed: true });
    const res = await api.demo.book({
      fullName: "A B",
      email: "a@b.com",
      preferredDateTime: "2026-09-01T10:00:00Z",
    });
    expect(res.data).toEqual({ confirmed: true });
  });

  it("api.newsletter.subscribe posts to /waitlist", async () => {
    mock.onPost("/waitlist").reply(200, {});
    const res = await api.newsletter.subscribe({ email: "a@b.com" });
    expect(res.status).toBe(200);
  });

  it("api.statements.list gets /statements", async () => {
    mock.onGet("/statements").reply(200, []);
    const res = await api.statements.list();
    expect(res.data).toEqual([]);
  });

  it("api.statements.generateBatch posts to /admin/statements/generate with params", async () => {
    mock.onPost("/admin/statements/generate").reply(200, {});
    const res = await api.statements.generateBatch(2026, 1);
    expect(res.status).toBe(200);
    expect(mock.history.post?.[0].params).toEqual({ year: 2026, month: 1 });
  });

  it("api.compliance.getAuditLogs gets /admin/compliance/audit-logs", async () => {
    mock.onGet("/admin/compliance/audit-logs").reply(200, []);
    const res = await api.compliance.getAuditLogs();
    expect(res.data).toEqual([]);
  });

  it("api.compliance.getReport gets /admin/compliance/report", async () => {
    mock.onGet("/admin/compliance/report").reply(200, { summary: "ok" });
    const res = await api.compliance.getReport();
    expect(res.data).toEqual({ summary: "ok" });
  });

  it("api.admin.users.getAll gets /admin/users", async () => {
    mock.onGet("/admin/users").reply(200, []);
    const res = await api.admin.users.getAll();
    expect(res.data).toEqual([]);
  });

  it("api.admin.users.create posts to /admin/users", async () => {
    mock.onPost("/admin/users").reply(201, { id: "u1" });
    const res = await api.admin.users.create({
      email: "a@b.com",
      password: "pw",
      fullName: "A B",
      role: "ADMIN",
    });
    expect(res.status).toBe(201);
  });

  it("api.admin.users.suspend posts to /admin/users/:id/suspend", async () => {
    mock.onPost("/admin/users/u1/suspend").reply(200, {});
    const res = await api.admin.users.suspend("u1", { action: "suspend" });
    expect(res.status).toBe(200);
  });

  it("api.admin.kyc.getAll gets /kyc", async () => {
    mock.onGet("/kyc").reply(200, []);
    const res = await api.admin.kyc.getAll();
    expect(res.data).toEqual([]);
  });

  it("api.admin.kyc.update puts to /kyc/:id", async () => {
    mock.onPut("/kyc/k1").reply(200, {});
    const res = await api.admin.kyc.update("k1", { status: "VERIFIED" });
    expect(res.status).toBe(200);
  });

  it("api.admin.settings.get gets /admin/settings", async () => {
    mock.onGet("/admin/settings").reply(200, {});
    const res = await api.admin.settings.get();
    expect(res.status).toBe(200);
  });

  it("api.admin.managers.getAll gets /admin/managers", async () => {
    mock.onGet("/admin/managers").reply(200, { managers: [] });
    const res = await api.admin.managers.getAll();
    expect(res.data).toEqual({ managers: [] });
  });

  it("api.admin.managers.create posts to /admin/managers", async () => {
    mock.onPost("/admin/managers").reply(201, { id: "m1" });
    const res = await api.admin.managers.create({
      email: "m@b.com",
      password: "pw",
      fullName: "M B",
    });
    expect(res.status).toBe(201);
  });

  it("api.admin.managers.getClients gets /admin/managers/:id/clients", async () => {
    mock.onGet("/admin/managers/m1/clients").reply(200, { clients: [] });
    const res = await api.admin.managers.getClients("m1");
    expect(res.data).toEqual({ clients: [] });
  });

  it("api.admin.wallets.creditUser posts to /admin/wallets/users/:id/credit", async () => {
    mock.onPost("/admin/wallets/users/u1/credit").reply(200, {
      message: "ok",
      availableBalance: 1100,
      amount: 100,
    });
    const res = await api.admin.wallets.creditUser("u1", { amount: 100 });
    expect(res.data.availableBalance).toBe(1100);
  });

  it("api.admin.wallets.getPendingWithdrawals gets /admin/wallets/withdrawals/pending", async () => {
    mock.onGet("/admin/wallets/withdrawals/pending").reply(200, {
      withdrawals: [],
      total: 0,
    });
    const res = await api.admin.wallets.getPendingWithdrawals();
    expect(res.data.total).toBe(0);
  });

  it("api.admin.wallets.approveWithdrawal patches /admin/wallets/withdrawals/:id/approve", async () => {
    mock.onPatch("/admin/wallets/withdrawals/tx1/approve").reply(200, {});
    const res = await api.admin.wallets.approveWithdrawal("tx1");
    expect(res.status).toBe(200);
  });

  it("api.admin.wallets.rejectWithdrawal patches /admin/wallets/withdrawals/:id/reject", async () => {
    mock.onPatch("/admin/wallets/withdrawals/tx1/reject").reply(200, {});
    const res = await api.admin.wallets.rejectWithdrawal("tx1", { reason: "fraud" });
    expect(res.status).toBe(200);
  });

  it("api.security.mfa.getStatus gets /admin/security/mfa/status", async () => {
    mock.onGet("/admin/security/mfa/status").reply(200, { mfaEnabled: true });
    const res = await api.security.mfa.getStatus();
    expect(res.data).toEqual({ mfaEnabled: true });
  });

  it("api.ops.getFlipbotStatus gets /ops/flipbot/status", async () => {
    mock.onGet("/ops/flipbot/status").reply(200, { connected: true });
    const res = await api.ops.getFlipbotStatus();
    expect(res.data).toEqual({ connected: true });
  });

  it("api.ops.runNavBatch posts to /ops/nav-batch/run", async () => {
    mock.onPost("/ops/nav-batch/run").reply(200, {});
    const res = await api.ops.runNavBatch();
    expect(res.status).toBe(200);
  });

  it("api.portfolioManager.getStrategies gets /portfolio-manager/strategies", async () => {
    mock.onGet("/portfolio-manager/strategies").reply(200, {
      strategies: [],
      combined: {},
    });
    const res = await api.portfolioManager.getStrategies();
    expect(res.status).toBe(200);
  });

  it("api.portfolioManager.switchStrategy posts to /portfolio-manager/strategies/:key/switch", async () => {
    mock.onPost("/portfolio-manager/strategies/momentum/switch").reply(200, {});
    const res = await api.portfolioManager.switchStrategy("momentum");
    expect(res.status).toBe(200);
  });

  it("api.portfolioManager.createClient posts to /portfolio-manager/clients", async () => {
    mock.onPost("/portfolio-manager/clients").reply(201, {
      message: "ok",
      client: {
        assignmentId: "a1",
        clientId: "c1",
        email: "c@b.com",
        fullName: "C B",
        kycStatus: "PENDING",
      },
    });
    const res = await api.portfolioManager.createClient({
      email: "c@b.com",
      password: "pw",
      fullName: "C B",
    });
    expect(res.status).toBe(201);
  });
});
