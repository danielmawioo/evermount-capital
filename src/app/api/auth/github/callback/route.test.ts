/**
 * @jest-environment node
 */

import { POST } from "./route";

describe("POST /api/auth/github/callback", () => {
  it("returns 501 and does not call GitHub", async () => {
    const originalFetch = global.fetch;
    global.fetch = jest.fn();
    const response = await POST();
    const data = await response.json();
    expect(response.status).toBe(501);
    expect(data.error).toMatch(/not available/i);
    expect(global.fetch).not.toHaveBeenCalled();
    global.fetch = originalFetch;
  });
});
