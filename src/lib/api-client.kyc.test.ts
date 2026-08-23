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

function makeFile(name: string, content = "file-contents") {
  return new File([content], name, { type: "text/plain" });
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api.kyc", () => {
  it("submit resolves with pending status", async () => {
    const response = await api.kyc.submit({
      identityDocument: makeFile("id.png"),
      proofOfAddress: makeFile("address.png"),
      selfie: makeFile("selfie.png"),
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ status: "pending" });
  });

  it("getStatus resolves with approved status", async () => {
    const response = await api.kyc.getStatus();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ status: "approved" });
  });
});
