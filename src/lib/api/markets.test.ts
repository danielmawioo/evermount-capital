import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { markets, MarketInstrument } from "./markets";

describe("markets api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  describe("list", () => {
    it("resolves with instruments list when authenticated", async () => {
      const instruments: MarketInstrument[] = [
        {
          symbol: "XAUUSD",
          name: "Gold Spot",
          delayClass: "DELAYED",
          quote: {
            last: 2050.5,
            bid: 2050.3,
            ask: 2050.7,
            volume: 15000,
            source: "XE",
            observedAt: "2026-09-23T15:30:00Z",
            ingestedAt: "2026-09-23T15:30:05Z",
            ageMs: 5000,
          },
        },
        {
          symbol: "GC",
          name: "Gold Futures",
          delayClass: "STALE",
          quote: {
            last: 2048.2,
            bid: 2048.0,
            ask: 2048.4,
            volume: 8000,
            source: "CME",
            observedAt: "2026-09-23T14:00:00Z",
            ingestedAt: "2026-09-23T14:00:10Z",
            ageMs: 5400000,
          },
        },
      ];

      mock.onGet("/v1/markets").reply(200, { instruments });

      const response = await markets.list();

      expect(response.data.instruments).toHaveLength(2);
      expect(response.data.instruments[0].symbol).toBe("XAUUSD");
      expect(response.data.instruments[0].delayClass).toBe("DELAYED");
      expect(response.data.instruments[1].delayClass).toBe("STALE");
      expect(mock.history.get[0].url).toBe("/v1/markets");
    });

    it("handles UNAVAILABLE instruments with null quote", async () => {
      const instruments: MarketInstrument[] = [
        {
          symbol: "XAUUSD",
          name: "Gold Spot",
          delayClass: "UNAVAILABLE",
          quote: null,
        },
      ];

      mock.onGet("/v1/markets").reply(200, { instruments });

      const response = await markets.list();

      expect(response.data.instruments[0].delayClass).toBe("UNAVAILABLE");
      expect(response.data.instruments[0].quote).toBeNull();
    });

    it("rejects with 401 when unauthorized", async () => {
      mock.onGet("/v1/markets").reply(401);

      await expect(markets.list()).rejects.toThrow();
    });

    it("rejects with 403 when forbidden", async () => {
      mock.onGet("/v1/markets").reply(403);

      await expect(markets.list()).rejects.toThrow();
    });

    it("rejects with 500 on server error", async () => {
      mock.onGet("/v1/markets").reply(500);

      await expect(markets.list()).rejects.toThrow();
    });
  });

  describe("getQuote", () => {
    it("resolves with single instrument quote", async () => {
      const instrument: MarketInstrument = {
        symbol: "XAUUSD",
        name: "Gold Spot",
        delayClass: "DELAYED",
        quote: {
          last: 2050.5,
          bid: 2050.3,
          ask: 2050.7,
          volume: 15000,
          source: "XE",
          observedAt: "2026-09-23T15:30:00Z",
          ingestedAt: "2026-09-23T15:30:05Z",
          ageMs: 5000,
        },
      };

      mock.onGet("/v1/markets/XAUUSD").reply(200, instrument);

      const response = await markets.getQuote("XAUUSD");

      expect(response.data.symbol).toBe("XAUUSD");
      expect(response.data.delayClass).toBe("DELAYED");
      expect(mock.history.get[0].url).toBe("/v1/markets/XAUUSD");
    });
  });
});
