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

describe("api.investments", () => {
  it("getOptions resolves with the mock options fixture", async () => {
    const response = await api.investments.getOptions({
      category: "growth",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      options: [
        {
          id: "opt1",
          name: "Growth Fund",
          symbol: "GRW",
          minInvestment: 100,
          riskLevel: "medium",
        },
      ],
    });
  });

  it("getPreferences resolves with the mock preferences fixture", async () => {
    const response = await api.investments.getPreferences();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      lockInMonths: 6,
      riskTolerance: "medium",
      reinvestProfits: false,
    });
  });

  it("updatePreferences resolves with the request body echoed back", async () => {
    const response = await api.investments.updatePreferences({
      lockInMonths: 12,
      riskTolerance: "high",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      lockInMonths: 12,
      riskTolerance: "high",
    });
  });

  it("previewTrade resolves with an estimated return computed by the mock handler", async () => {
    const response = await api.investments.previewTrade({ amount: 1000 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ estimatedReturn: 50 });
  });

  it("executeTrade resolves with the mock trade id", async () => {
    const response = await api.investments.executeTrade({ amount: 1000 });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ id: "trade-mock-1" });
  });

  it("create resolves with the mock investment id", async () => {
    const response = await api.investments.create({
      investmentOptionId: "opt1",
      amount: 1000,
      strategy: "growth",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ id: "investment-mock-1" });
  });

  it("close resolves with success:true", async () => {
    const response = await api.investments.close("inv-1", {
      reason: "matured",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });
});
