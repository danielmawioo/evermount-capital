import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { transactions } from "./transactions";

describe("transactions api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getAll gets /transactions with filter params", async () => {
    mock.onGet("/transactions").reply(200, { items: [] });
    const params = {
      type: "DEPOSIT",
      status: "COMPLETED",
      startDate: "2026-01-01",
      endDate: "2026-08-22",
      page: 1,
      limit: 20,
    };
    const res = await transactions.getAll(params);
    expect(res.data).toEqual({ items: [] });
    const req = mock.history.get[0];
    expect(req.url).toBe("/transactions");
    expect(req.params).toEqual(params);
  });

  it("getAll gets /transactions without params", async () => {
    mock.onGet("/transactions").reply(200, { items: [] });
    const res = await transactions.getAll();
    expect(res.data).toEqual({ items: [] });
    const req = mock.history.get[0];
    expect(req.url).toBe("/transactions");
    expect(req.params).toBeUndefined();
  });

  it("getById gets /transactions/:transactionId", async () => {
    mock.onGet("/transactions/tx-1").reply(200, { id: "tx-1" });
    const res = await transactions.getById("tx-1");
    expect(res.data).toEqual({ id: "tx-1" });
    expect(mock.history.get[0].url).toBe("/transactions/tx-1");
  });
});
