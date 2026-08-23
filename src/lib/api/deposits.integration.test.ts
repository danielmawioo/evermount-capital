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
import { deposits } from "./deposits";

/**
 * Integration-style test for the deposits API module: instead of mocking
 * axios directly (see deposits.test.ts, which uses axios-mock-adapter),
 * this spins up the real MSW Node server and exercises `deposits.*`
 * through the actual `apiClient` axios instance, so a request genuinely
 * goes through axios's request/response pipeline and is intercepted at
 * the network layer — the same mock backend used for `yarn dev:mock`.
 *
 * This file owns the server's lifecycle entirely: `listen`/`resetHandlers`/
 * `close` are scoped to this file's beforeAll/afterEach/afterAll, so MSW
 * never intercepts requests made by other test files.
 */
describe("deposits api (MSW integration)", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("getAll resolves with the deposits list served by the mock handler", async () => {
    const response = await deposits.getAll({
      status: "completed",
      page: 1,
      limit: 20,
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ deposits: [] });
  });

  it("getStatus resolves with the deposit for the given id, echoed by the mock handler", async () => {
    const response = await deposits.getStatus("dep-123");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ id: "dep-123", status: "completed" });
  });

  it("bank resolves with a created bank deposit matching the mock handler's fixture", async () => {
    const response = await deposits.bank({
      amount: 500,
      currency: "USD",
      bankAccountId: "acc-1",
      reference: "invoice-1",
    });

    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "dep-bank-1",
      status: "pending",
      amount: 500,
      currency: "USD",
    });
  });

  it("mpesa resolves with a created mpesa deposit matching the mock handler's fixture", async () => {
    const response = await deposits.mpesa({
      amount: 1000,
      currency: "KES",
      phoneNumber: "254712345678",
    });

    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "dep-mpesa-1",
      status: "pending",
      amount: 1000,
      currency: "KES",
    });
  });
});
