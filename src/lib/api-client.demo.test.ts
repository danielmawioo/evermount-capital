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

describe("api.demo", () => {
  it("getBookedSlots resolves with the mock slots fixture", async () => {
    const response = await api.demo.getBookedSlots();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ slots: ["2026-09-01T10:00:00Z"] });
  });

  it("book resolves with the mock demo booking id", async () => {
    const response = await api.demo.book({
      fullName: "Jane Investor",
      email: "jane@example.com",
      preferredDateTime: "2026-09-01T10:00:00Z",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ id: "demo-mock-1" });
  });
});
