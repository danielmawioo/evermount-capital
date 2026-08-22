/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { POST } from "./route";

function makeRequest(body: unknown) {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

const validBody = {
  messages: [{ role: "user", content: "How do I deposit funds?" }],
  department: "payments",
};

describe("POST /api/chat", () => {
  const originalFetch = global.fetch;
  const originalEnv = { ...process.env };

  beforeEach(() => {
    global.fetch = jest.fn();
    process.env.OPENAI_API_KEY = "test-api-key";
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  it("returns 400 when messages is missing", async () => {
    const response = await POST(makeRequest({ department: "payments" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Messages array is required" });
  });

  it("returns 400 when messages is not an array", async () => {
    const response = await POST(
      makeRequest({ messages: "not-an-array", department: "payments" }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Messages array is required" });
  });

  it("returns 400 when messages is empty", async () => {
    const response = await POST(
      makeRequest({ messages: [], department: "payments" }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "At least one message is required" });
  });

  it("returns 400 when department is missing", async () => {
    const response = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Department is required" });
  });

  it("returns 400 when department is invalid", async () => {
    const response = await POST(
      makeRequest({
        messages: [{ role: "user", content: "hi" }],
        department: "not-a-real-department",
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Invalid department" });
  });

  it("returns a not-configured fallback message when OPENAI_API_KEY is unset", async () => {
    delete process.env.OPENAI_API_KEY;

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.error).toBe("API key not configured");
    expect(data.message).toContain("support@evermount.co");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("returns 200 with the OpenAI completion on a successful call", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content:
                "You can deposit at https://www.evermount.co/dashboard/deposit.",
            },
          },
        ],
      }),
    });

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe(
      "You can deposit at https://www.evermount.co/dashboard/deposit.",
    );
    expect(data.links).toEqual(["https://www.evermount.co/dashboard/deposit."]);
    expect(data.needsHumanSupport).toBe(false);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer test-api-key",
        }),
      }),
    );

    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const parsedBody = JSON.parse(options.body);
    expect(parsedBody.messages[0]).toEqual(
      expect.objectContaining({ role: "system" }),
    );
    expect(parsedBody.messages[0].content).toContain("Payments & Billing");
    expect(parsedBody.messages[1]).toEqual({
      role: "user",
      content: "How do I deposit funds?",
    });
  });

  it("flags needsHumanSupport when the completion mentions the escalation email", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: "Please contact payments@evermount.co for further help.",
            },
          },
        ],
      }),
    });

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(data.needsHumanSupport).toBe(true);
  });

  it("falls back to the department playbook response when OpenAI is rate-limited", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 429,
      text: async () =>
        JSON.stringify({
          error: { code: "insufficient_quota", type: "rate_limit" },
        }),
    });

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.fallback).toBe(true);
    expect(data.needsHumanSupport).toBe(false);
    expect(data.escalationEmail).toBe("payments@evermount.co");
    expect(typeof data.message).toBe("string");
    expect(data.message.length).toBeGreaterThan(0);
    expect(Array.isArray(data.links)).toBe(true);
  });

  it("returns a 401-specific error message when OpenAI auth fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 401,
      text: async () =>
        JSON.stringify({ error: { message: "invalid api key" } }),
    });

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toContain("Authentication error");
    expect(data.error).toBe("API request failed");
  });

  it("returns a generic 500 error for other OpenAI failures", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      text: async () => "Service unavailable",
    });

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("API request failed");
    expect(data.message).toContain("technical difficulties");
  });

  it("returns 500 when the fetch call itself throws", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

    const response = await POST(makeRequest(validBody));
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Internal server error");
    expect(data.message).toContain("technical difficulties");
  });
});
