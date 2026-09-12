/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("GET /api/ready", () => {
  it("returns readiness without secrets", async () => {
    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ready");
    expect(typeof body.uptimeMs).toBe("number");
    expect(body.uptimeMs).toBeGreaterThanOrEqual(0);
    expect(body).not.toHaveProperty("dsn");
    expect(body).not.toHaveProperty("apiKey");
    expect(JSON.stringify(body)).not.toMatch(/secret|password|token/i);
  });
});
