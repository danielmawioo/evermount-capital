import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { portfolio } from "./portfolio";

describe("portfolio api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("get gets /portfolio", async () => {
    mock.onGet("/portfolio").reply(200, { totalValue: 1000 });
    const res = await portfolio.get();
    expect(res.data).toEqual({ totalValue: 1000 });
    expect(mock.history.get[0].url).toBe("/portfolio");
  });

  it("getPerformance gets /portfolio/performance with period param", async () => {
    mock.onGet("/portfolio/performance").reply(200, { series: [] });
    const res = await portfolio.getPerformance({ period: "1M" });
    expect(res.data).toEqual({ series: [] });
    const req = mock.history.get[0];
    expect(req.url).toBe("/portfolio/performance");
    expect(req.params).toEqual({ period: "1M" });
  });

  it("getPerformance gets /portfolio/performance without params", async () => {
    mock.onGet("/portfolio/performance").reply(200, { series: [] });
    const res = await portfolio.getPerformance();
    expect(res.data).toEqual({ series: [] });
    const req = mock.history.get[0];
    expect(req.url).toBe("/portfolio/performance");
    expect(req.params).toBeUndefined();
  });
});
