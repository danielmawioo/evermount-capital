/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { POST } from "./route";

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/auth/github/callback", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/auth/github/callback", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("returns 400 when the authorization code is missing", async () => {
    const response = await POST(makeRequest({}));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Authorization code is required" });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns 500 when the GitHub token exchange request fails (non-ok response)", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const response = await POST(makeRequest({ code: "abc" }));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to authenticate with GitHub" });
  });

  it("returns 400 when GitHub responds with an error field", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        error: "bad_verification_code",
        error_description: "The code passed is incorrect or expired.",
      }),
    });

    const response = await POST(makeRequest({ code: "expired-code" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      error: "The code passed is incorrect or expired.",
    });
  });

  it("returns 200 with the access token on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: "gh-token-123", scope: "user:email" }),
    });

    const response = await POST(makeRequest({ code: "valid-code" }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ accessToken: "gh-token-123" });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://github.com/login/oauth/access_token",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }),
    );
    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(options.body)).toMatchObject({ code: "valid-code" });
  });

  it("returns 500 when the fetch call itself throws", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

    const response = await POST(makeRequest({ code: "abc" }));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to authenticate with GitHub" });
  });
});
