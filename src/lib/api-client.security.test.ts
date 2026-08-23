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

describe("api.security", () => {
  it("mfa.getStatus resolves with enabled:false", async () => {
    const response = await api.security.mfa.getStatus();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ enabled: false });
  });

  it("mfa.setup resolves with the mock secret/qr fixture", async () => {
    const response = await api.security.mfa.setup();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      secret: "mock-mfa-secret",
      qrCode: "data:image/png;base64,",
    });
  });

  it("mfa.enable resolves with enabled:true", async () => {
    const response = await api.security.mfa.enable({ token: "123456" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ enabled: true });
  });

  it("mfa.disable resolves with enabled:false", async () => {
    const response = await api.security.mfa.disable({ token: "123456" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ enabled: false });
  });
});
