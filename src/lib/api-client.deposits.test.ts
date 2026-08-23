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

// deposits.getAll, getStatus, bank, and mpesa are already covered by
// api/deposits.integration.test.ts — only the remaining methods are
// exercised here to avoid duplicating that coverage.
describe("api.deposits", () => {
  it("getSettlementAccount resolves with the mock settlement account", async () => {
    const response = await api.deposits.getSettlementAccount();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      accountNumber: "1234567890",
      bankName: "Evermount Settlement Bank",
    });
  });

  it("card resolves with a created card deposit matching the mock handler's fixture", async () => {
    const response = await api.deposits.card({
      amount: 250,
      currency: "USD",
      cardToken: "tok_visa",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "dep-card-1",
      status: "pending",
      amount: 250,
      currency: "USD",
    });
  });

  it("confirmStripe resolves with a succeeded status", async () => {
    const response = await api.deposits.confirmStripe({
      paymentIntentId: "pi_123",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: "succeeded" });
  });

  it("crypto resolves with a created crypto deposit matching the mock handler's fixture", async () => {
    const response = await api.deposits.crypto({
      amount: 300,
      currency: "USDT",
      walletAddress: "0xabc123",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "dep-crypto-1",
      status: "pending",
      amount: 300,
      currency: "USDT",
    });
  });
});
