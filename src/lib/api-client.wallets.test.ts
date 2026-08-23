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

describe("api.wallets", () => {
  it("getBalance resolves with the mock balance", async () => {
    const response = await api.wallets.getBalance();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      balance: 5000,
      availableBalance: 5000,
      currency: "USD",
    });
  });

  it("getHistory resolves with an empty items fixture", async () => {
    const response = await api.wallets.getHistory({
      type: "deposit",
      page: 1,
      limit: 20,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ items: [] });
  });

  it("transferToInvestment resolves with transferred:true", async () => {
    const response = await api.wallets.transferToInvestment({
      amount: 500,
      investmentOptionId: "opt1",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ transferred: true });
  });

  it("withdrawProfit resolves with withdrawn:true", async () => {
    const response = await api.wallets.withdrawProfit({ amount: 100 });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ withdrawn: true });
  });
});
