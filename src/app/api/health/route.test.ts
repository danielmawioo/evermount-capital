/**
 * @jest-environment node
 */
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns a 200 with status ok", async () => {
    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(typeof body.timestamp).toBe("string");
  });
});
