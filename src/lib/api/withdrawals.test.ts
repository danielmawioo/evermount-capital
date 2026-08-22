import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { withdrawals } from "./withdrawals";

describe("withdrawals api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("bank posts bank withdrawal data to /withdrawals/bank", async () => {
    mock.onPost("/withdrawals/bank").reply(200, { id: "w1" });
    const body = {
      amount: 100,
      currency: "USD",
      bankAccountId: "b1",
      reason: "cashout",
    };
    const res = await withdrawals.bank(body);
    expect(res.data).toEqual({ id: "w1" });
    const req = mock.history.post[0];
    expect(req.url).toBe("/withdrawals/bank");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("crypto posts crypto withdrawal data to /withdrawals/crypto", async () => {
    mock.onPost("/withdrawals/crypto").reply(200, { id: "w2" });
    const body = {
      amount: 0.5,
      currency: "BTC",
      walletAddress: "1A2b3C",
      network: "bitcoin",
    };
    const res = await withdrawals.crypto(body);
    expect(res.data).toEqual({ id: "w2" });
    const req = mock.history.post[0];
    expect(req.url).toBe("/withdrawals/crypto");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("mpesa posts mpesa withdrawal data to /withdrawals/mpesa", async () => {
    mock.onPost("/withdrawals/mpesa").reply(200, { id: "w3" });
    const body = {
      amount: 200,
      currency: "KES",
      phoneNumber: "254712345678",
      reason: "cashout",
    };
    const res = await withdrawals.mpesa(body);
    expect(res.data).toEqual({ id: "w3" });
    const req = mock.history.post[0];
    expect(req.url).toBe("/withdrawals/mpesa");
    expect(JSON.parse(req.data)).toEqual(body);
  });

  it("getStatus gets /withdrawals/:withdrawalId", async () => {
    mock.onGet("/withdrawals/w1").reply(200, { status: "PENDING" });
    const res = await withdrawals.getStatus("w1");
    expect(res.data).toEqual({ status: "PENDING" });
    expect(mock.history.get[0].url).toBe("/withdrawals/w1");
  });

  it("getAll gets /withdrawals with filter params", async () => {
    mock.onGet("/withdrawals").reply(200, { items: [] });
    const params = { status: "PENDING", page: 1, limit: 10 };
    const res = await withdrawals.getAll(params);
    expect(res.data).toEqual({ items: [] });
    const req = mock.history.get[0];
    expect(req.url).toBe("/withdrawals");
    expect(req.params).toEqual(params);
  });

  it("getAll gets /withdrawals without params", async () => {
    mock.onGet("/withdrawals").reply(200, { items: [] });
    const res = await withdrawals.getAll();
    expect(res.data).toEqual({ items: [] });
    expect(mock.history.get[0].params).toBeUndefined();
  });

  it("cancel posts to /withdrawals/:withdrawalId/cancel", async () => {
    mock.onPost("/withdrawals/w1/cancel").reply(200, { cancelled: true });
    const res = await withdrawals.cancel("w1");
    expect(res.data).toEqual({ cancelled: true });
    expect(mock.history.post[0].url).toBe("/withdrawals/w1/cancel");
  });
});
