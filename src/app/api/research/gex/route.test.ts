/**
 * @jest-environment node
 */
import { GET } from "./route";
import { GEX_FIXTURE } from "@/lib/gex-public";

describe("GET /api/research/gex", () => {
  const originalUrl = process.env.GEX_ENGINE_URL;

  afterEach(() => {
    process.env.GEX_ENGINE_URL = originalUrl;
    jest.restoreAllMocks();
  });

  it("returns the engine fixture when GEX_ENGINE_URL is unset", async () => {
    delete process.env.GEX_ENGINE_URL;
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.live).toBe(false);
    expect(body.spot).toBe(GEX_FIXTURE.spot);
    expect(body.source).toBe("engine-fixture");
  });

  it("maps a live overlay payload when the engine responds", async () => {
    process.env.GEX_ENGINE_URL = "http://gex.internal";
    jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          spot: 4401.2,
          futures: 4405.1,
          basis: 3.9,
          gamma_flip: 4398,
          max_pain: 4400,
          gex: 12.5,
          regime: "long_gamma",
          note: "Live chain",
        }),
        { status: 200 },
      ),
    );

    const response = await GET();
    const body = await response.json();

    expect(body.live).toBe(true);
    expect(body.spot).toBe(4401.2);
    expect(body.regime).toBe("long_gamma");
    expect(body.note).toBe("Live chain");
  });
});
