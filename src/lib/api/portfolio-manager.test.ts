import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { portfolioManager } from "./portfolio-manager";

describe("portfolioManager api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getStrategies gets /portfolio-manager/strategies", async () => {
    const payload = { strategies: [], combined: { totalPoolAum: 0 } };
    mock.onGet("/portfolio-manager/strategies").reply(200, payload);
    const res = await portfolioManager.getStrategies();
    expect(res.data).toEqual(payload);
    expect(mock.history.get[0].url).toBe("/portfolio-manager/strategies");
  });

  it("switchStrategy posts to /portfolio-manager/strategies/:strategyKey/switch", async () => {
    mock
      .onPost("/portfolio-manager/strategies/alpha/switch")
      .reply(200, { switched: true });
    const res = await portfolioManager.switchStrategy("alpha");
    expect(res.data).toEqual({ switched: true });
    expect(mock.history.post[0].url).toBe(
      "/portfolio-manager/strategies/alpha/switch",
    );
  });

  it("setStrategyActive posts active flag to /portfolio-manager/strategies/:strategyKey/active", async () => {
    mock
      .onPost("/portfolio-manager/strategies/alpha/active")
      .reply(200, { active: true });
    const res = await portfolioManager.setStrategyActive("alpha", true);
    expect(res.data).toEqual({ active: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/portfolio-manager/strategies/alpha/active");
    expect(JSON.parse(req.data)).toEqual({ active: true });
  });

  it("createClient posts client data to /portfolio-manager/clients", async () => {
    const payload = {
      message: "created",
      client: {
        assignmentId: "a1",
        clientId: "c1",
        email: "a@b.com",
        fullName: "A B",
        kycStatus: "PENDING",
      },
    };
    mock.onPost("/portfolio-manager/clients").reply(200, payload);
    const body = {
      email: "a@b.com",
      password: "pw",
      fullName: "A B",
      phoneNumber: "123",
      notes: "note",
    };
    const res = await portfolioManager.createClient(body);
    expect(res.data).toEqual(payload);
    const req = mock.history.post[0];
    expect(req.url).toBe("/portfolio-manager/clients");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("assignClient posts to /portfolio-manager/clients/assign", async () => {
    const payload = {
      message: "assigned",
      client: {
        assignmentId: "a1",
        clientId: "c1",
        email: "a@b.com",
        fullName: "A B",
        kycStatus: "APPROVED",
      },
    };
    mock.onPost("/portfolio-manager/clients/assign").reply(200, payload);
    const body = { email: "a@b.com", notes: "note" };
    const res = await portfolioManager.assignClient(body);
    expect(res.data).toEqual(payload);
    const req = mock.history.post[0];
    expect(req.url).toBe("/portfolio-manager/clients/assign");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("getClients gets /portfolio-manager/clients", async () => {
    const payload = { clients: [] };
    mock.onGet("/portfolio-manager/clients").reply(200, payload);
    const res = await portfolioManager.getClients();
    expect(res.data).toEqual(payload);
    expect(mock.history.get[0].url).toBe("/portfolio-manager/clients");
  });

  it("getInvestmentOptions gets /portfolio-manager/investment-options", async () => {
    const payload = { options: [] };
    mock.onGet("/portfolio-manager/investment-options").reply(200, payload);
    const res = await portfolioManager.getInvestmentOptions();
    expect(res.data).toEqual(payload);
    expect(mock.history.get[0].url).toBe(
      "/portfolio-manager/investment-options",
    );
  });

  it("previewAllocation posts allocation data to /portfolio-manager/clients/:clientId/allocate/preview", async () => {
    mock
      .onPost("/portfolio-manager/clients/c1/allocate/preview")
      .reply(200, { preview: true });
    const body = {
      investmentOptionId: "opt1",
      amount: 1000,
      lockInMonths: 6,
    };
    const res = await portfolioManager.previewAllocation("c1", body);
    expect(res.data).toEqual({ preview: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/portfolio-manager/clients/c1/allocate/preview");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("allocateForClient posts allocation data to /portfolio-manager/clients/:clientId/allocate", async () => {
    mock
      .onPost("/portfolio-manager/clients/c1/allocate")
      .reply(200, { allocated: true });
    const body = { investmentOptionId: "opt1", amount: 500 };
    const res = await portfolioManager.allocateForClient("c1", body);
    expect(res.data).toEqual({ allocated: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/portfolio-manager/clients/c1/allocate");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("unassignClient deletes /portfolio-manager/clients/:clientId", async () => {
    mock
      .onDelete("/portfolio-manager/clients/c1")
      .reply(200, { unassigned: true });
    const res = await portfolioManager.unassignClient("c1");
    expect(res.data).toEqual({ unassigned: true });
    expect(mock.history.delete[0].url).toBe("/portfolio-manager/clients/c1");
  });
});
