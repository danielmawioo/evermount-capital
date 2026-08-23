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
import { API_BASE_URL } from "./api/client";
import { api } from "./api-client";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api.statements", () => {
  it("list resolves with an empty statements fixture", async () => {
    const response = await api.statements.list();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ statements: [] });
  });

  it("downloadUrl builds the download URL without making a network request", () => {
    // Pure string builder — no MSW handler involved, included here only
    // for exhaustive coverage of every exported `statements` method.
    const url = api.statements.downloadUrl("stmt-1");
    expect(url).toBe(`${API_BASE_URL}/statements/stmt-1/download`);
  });

  it("generateBatch resolves with generated:true", async () => {
    const response = await api.statements.generateBatch(2026, 8);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ generated: true });
  });
});
