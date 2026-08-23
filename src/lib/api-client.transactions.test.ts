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

describe("api.transactions", () => {
  it("getAll resolves with an empty items fixture", async () => {
    const response = await api.transactions.getAll({
      type: "deposit",
      status: "completed",
      page: 1,
      limit: 20,
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ items: [] });
  });

  it("getById resolves with the transaction id echoed by the mock handler", async () => {
    const response = await api.transactions.getById("txn-123");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "txn-123" });
  });
});
