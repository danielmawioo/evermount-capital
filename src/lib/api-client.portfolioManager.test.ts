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

describe("api.portfolioManager", () => {
  it("getStrategies resolves with the mock strategies/combined fixture", async () => {
    const response = await api.portfolioManager.getStrategies();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      strategies: [],
      combined: {
        totalPoolAum: 0,
        totalInvestors: 0,
        strategyCount: 0,
        activeCount: 0,
        primaryStrategy: null,
        weightedDailyReturnPct: 0,
        weightedCumulativeReturnPct: 0,
        blendedNavPerUnit: 0,
        quantConnected: true,
        flipbotConnected: true,
        killSwitchActive: false,
        tradingMode: "demo",
      },
    });
  });

  it("switchStrategy resolves with switched:true", async () => {
    const response = await api.portfolioManager.switchStrategy("strategy-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ switched: true });
  });

  it("setStrategyActive resolves with the active flag echoed back", async () => {
    const response = await api.portfolioManager.setStrategyActive(
      "strategy-1",
      false,
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ active: false });
  });

  it("createClient resolves with the created client echoed back", async () => {
    const response = await api.portfolioManager.createClient({
      email: "client@example.com",
      password: "password123",
      fullName: "New Client",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "created",
      client: {
        assignmentId: "assignment-mock-1",
        clientId: "client-mock-1",
        email: "client@example.com",
        fullName: "New Client",
        kycStatus: "PENDING",
      },
    });
  });

  it("assignClient resolves with the assigned client echoed back", async () => {
    const response = await api.portfolioManager.assignClient({
      email: "existing@example.com",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      message: "assigned",
      client: {
        assignmentId: "assignment-mock-1",
        clientId: "client-mock-1",
        email: "existing@example.com",
        fullName: "Mock Client",
        kycStatus: "APPROVED",
      },
    });
  });

  it("getClients resolves with an empty clients fixture", async () => {
    const response = await api.portfolioManager.getClients();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ clients: [] });
  });

  it("getInvestmentOptions resolves with an empty options fixture", async () => {
    const response = await api.portfolioManager.getInvestmentOptions();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ options: [] });
  });

  it("previewAllocation resolves with preview:true", async () => {
    const response = await api.portfolioManager.previewAllocation("client-1", {
      investmentOptionId: "opt1",
      amount: 500,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ preview: true });
  });

  it("allocateForClient resolves with allocated:true", async () => {
    const response = await api.portfolioManager.allocateForClient("client-1", {
      investmentOptionId: "opt1",
      amount: 500,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ allocated: true });
  });

  it("unassignClient resolves with unassigned:true", async () => {
    const response = await api.portfolioManager.unassignClient("client-1");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ unassigned: true });
  });
});
