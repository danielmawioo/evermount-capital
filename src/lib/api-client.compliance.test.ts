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

describe("api.compliance", () => {
  it("getAuditLogs resolves with the mock logs fixture", async () => {
    const response = await api.compliance.getAuditLogs({
      from: "2026-01-01",
      to: "2026-08-01",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ logs: [{ id: "l1", action: "login" }] });
  });

  it("exportAuditLogs resolves with the mock CSV export", async () => {
    const response = await api.compliance.exportAuditLogs({
      from: "2026-01-01",
      to: "2026-08-01",
    });
    expect(response.status).toBe(200);
    // `exportAuditLogs` requests `responseType: "blob"`, which is an
    // XHR-adapter concept. Under this file's `@jest-environment node`,
    // axios uses its `http` adapter (see the docblock above), which does
    // not materialize a Blob for that responseType and just returns the
    // raw text — confirmed by inspecting `response.data` directly. In
    // the browser (the app's real runtime, via axios's xhr adapter) this
    // resolves to an actual Blob; that behavior is exercised by
    // `compliance.test.ts`'s axios-mock-adapter unit tests instead. Here
    // we only assert the mock handler's CSV body reached the caller.
    expect(response.data).toBe("id,action\nl1,login\n");
  });

  it("getReport resolves with the mock compliance report", async () => {
    const response = await api.compliance.getReport();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      totalUsers: 100,
      flaggedTransactions: 2,
    });
  });
});
