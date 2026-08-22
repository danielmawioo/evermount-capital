import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { investments } from "./investments";

describe("investments api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getOptions sends category param and resolves with options", async () => {
    const options = [{ id: "opt1", name: "Growth Fund" }];
    mock.onGet("/investments/options").reply(200, { options });

    const response = await investments.getOptions({ category: "growth" });

    expect(response.data).toEqual({ options });
    expect(mock.history.get[0].params).toEqual({ category: "growth" });
  });

  it("getOptions works without params", async () => {
    mock.onGet("/investments/options").reply(200, { options: [] });

    const response = await investments.getOptions();

    expect(response.data).toEqual({ options: [] });
  });

  it("getPreferences resolves with user preferences", async () => {
    const preferences = { lockInMonths: 6, riskTolerance: "medium" };
    mock.onGet("/investments/preferences").reply(200, preferences);

    const response = await investments.getPreferences();

    expect(response.data).toEqual(preferences);
  });

  it("updatePreferences puts preference updates", async () => {
    const data = {
      lockInMonths: 12,
      riskTolerance: "high",
      reinvestProfits: true,
    };
    mock.onPut("/investments/preferences").reply(200, data);

    const response = await investments.updatePreferences(data);

    expect(response.data).toEqual(data);
    expect(JSON.parse(mock.history.put[0].data)).toEqual(data);
  });

  it("previewTrade posts trade preview data", async () => {
    const data = { amount: 1000, lockInMonths: 6 };
    const preview = { estimatedReturn: 50 };
    mock.onPost("/investments/trade/preview").reply(200, preview);

    const response = await investments.previewTrade(data);

    expect(response.data).toEqual(preview);
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("executeTrade posts trade execution data", async () => {
    const data = { amount: 1000, lockInMonths: 6 };
    mock.onPost("/investments/trade").reply(201, { id: "trade1" });

    const response = await investments.executeTrade(data);

    expect(response.data).toEqual({ id: "trade1" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("create posts a new investment", async () => {
    const data = {
      investmentOptionId: "opt1",
      amount: 500,
      strategy: "conservative",
    };
    mock.onPost("/investments").reply(201, { id: "inv1" });

    const response = await investments.create(data);

    expect(response.data).toEqual({ id: "inv1" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("close posts a close request with a reason for the given investment", async () => {
    const data = { reason: "cash needed" };
    mock.onPost("/investments/inv1/close").reply(200, { success: true });

    const response = await investments.close("inv1", data);

    expect(response.data).toEqual({ success: true });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
    expect(mock.history.post[0].url).toBe("/investments/inv1/close");
  });
});
