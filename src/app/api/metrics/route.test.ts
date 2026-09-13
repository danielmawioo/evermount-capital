/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("GET /api/metrics", () => {
  it("exposes process gauges without secrets", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("evermount_up 1");
    expect(body).toMatch(/evermount_uptime_ms \d+/);
    expect(body).not.toMatch(/secret|password|token|dsn/i);
  });
});
