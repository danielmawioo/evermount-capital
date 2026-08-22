import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { wallets } from "./wallets";

describe("wallets api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getBalance gets /wallets/balance", async () => {
    mock.onGet("/wallets/balance").reply(200, { balance: 500 });
    const res = await wallets.getBalance();
    expect(res.data).toEqual({ balance: 500 });
    expect(mock.history.get[0].url).toBe("/wallets/balance");
  });

  it("getHistory gets /wallets/history with filter params", async () => {
    mock.onGet("/wallets/history").reply(200, { items: [] });
    const params = {
      type: "DEPOSIT",
      startDate: "2026-01-01",
      endDate: "2026-08-22",
      page: 1,
      limit: 10,
    };
    const res = await wallets.getHistory(params);
    expect(res.data).toEqual({ items: [] });
    const req = mock.history.get[0];
    expect(req.url).toBe("/wallets/history");
    expect(req.params).toEqual(params);
  });

  it("getHistory gets /wallets/history without params", async () => {
    mock.onGet("/wallets/history").reply(200, { items: [] });
    const res = await wallets.getHistory();
    expect(res.data).toEqual({ items: [] });
    expect(mock.history.get[0].params).toBeUndefined();
  });

  it("transferToInvestment posts data to /wallets/transfer-to-investment", async () => {
    mock
      .onPost("/wallets/transfer-to-investment")
      .reply(200, { transferred: true });
    const body = {
      amount: 1000,
      investmentOptionId: "opt1",
      strategy: "alpha",
    };
    const res = await wallets.transferToInvestment(body);
    expect(res.data).toEqual({ transferred: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/wallets/transfer-to-investment");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("withdrawProfit posts amount/reason to /wallets/withdraw-profit", async () => {
    mock.onPost("/wallets/withdraw-profit").reply(200, { withdrawn: true });
    const body = { amount: 250, reason: "cashout" };
    const res = await wallets.withdrawProfit(body);
    expect(res.data).toEqual({ withdrawn: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/wallets/withdraw-profit");
    expect(JSON.parse(req.data)).toEqual(body);
  });
});
