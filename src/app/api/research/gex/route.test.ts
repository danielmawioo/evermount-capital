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
    expect(body.mode).toBe("PAPER");
    expect(body.calibration).toBe("PLACEHOLDER_PRIORS");
  });

  it("maps a live public overlay payload when the engine responds", async () => {
    process.env.GEX_ENGINE_URL = "http://gex.internal";
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          spot: 4401.2,
          futures: 4405.1,
          basis: 3.9,
          gamma_flip: 4398,
          max_pain: 4400,
          gex: 12.5,
          regime: "NEGATIVE_GAMMA",
          expected_move: 19.2,
          session: "LONDON",
          confidence: 0.4,
          calibration: "PLACEHOLDER_PRIORS",
          mode: "PAPER",
          halt: false,
          risk_budget_usd: 750,
          max_daily_loss_usd: 1500,
          note: "Live chain",
        }),
        { status: 200 },
      ),
    );

    const response = await GET();
    const body = await response.json();

    expect(fetchMock).toHaveBeenCalledWith(
      "http://gex.internal/api/public/overlay",
      expect.any(Object),
    );
    expect(body.live).toBe(true);
    expect(body.spot).toBe(4401.2);
    expect(body.regime).toBe("NEGATIVE_GAMMA");
    expect(body.session).toBe("LONDON");
    expect(body.expectedMove).toBe(19.2);
    expect(body.mode).toBe("PAPER");
    expect(body.note).toBe("Live chain");
  });

  it("falls back to /api/mt5 when the public overlay is missing", async () => {
    process.env.GEX_ENGINE_URL = "http://gex.internal";
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(new Response("nope", { status: 404 }))
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            spot: 4400,
            futures: 4402,
            basis: 2,
            gamma_flip: 4390,
            max_pain: 4385,
            gex: 1,
            regime: "POSITIVE_GAMMA",
            note: "MT5 overlay",
          }),
          { status: 200 },
        ),
      );

    const response = await GET();
    const body = await response.json();

    expect(body.live).toBe(true);
    expect(body.spot).toBe(4400);
    expect(body.note).toBe("MT5 overlay");
  });
});
