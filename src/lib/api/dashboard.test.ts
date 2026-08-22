import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { dashboard } from "./dashboard";

describe("dashboard api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getStats resolves with dashboard stats", async () => {
    const stats = { totalBalance: 1000, activeInvestments: 3 };
    mock.onGet("/dashboard/stats").reply(200, stats);

    const response = await dashboard.getStats();

    expect(response.data).toEqual(stats);
    expect(mock.history.get[0].url).toBe("/dashboard/stats");
  });
});
