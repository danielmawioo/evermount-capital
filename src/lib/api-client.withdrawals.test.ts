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

describe("api.withdrawals", () => {
  it("bank resolves with the mock withdrawal id", async () => {
    const response = await api.withdrawals.bank({
      amount: 200,
      currency: "USD",
      bankAccountId: "acc-1",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "wd-bank-1" });
  });

  it("crypto resolves with the mock withdrawal id", async () => {
    const response = await api.withdrawals.crypto({
      amount: 200,
      currency: "USDT",
      walletAddress: "0xabc123",
      network: "ERC20",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "wd-crypto-1" });
  });

  it("mpesa resolves with the mock withdrawal id", async () => {
    const response = await api.withdrawals.mpesa({
      amount: 200,
      currency: "KES",
      phoneNumber: "254712345678",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "wd-mpesa-1" });
  });

  it("getStatus resolves with the withdrawal id echoed by the mock handler", async () => {
    const response = await api.withdrawals.getStatus("wd-123");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "wd-123", status: "PENDING" });
  });

  it("getAll resolves with an empty items fixture", async () => {
    const response = await api.withdrawals.getAll({
      status: "pending",
      page: 1,
      limit: 20,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ items: [] });
  });

  it("cancel resolves with cancelled:true", async () => {
    const response = await api.withdrawals.cancel("wd-123");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ cancelled: true });
  });
});
