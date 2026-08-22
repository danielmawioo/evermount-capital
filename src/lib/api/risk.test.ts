import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { risk } from "./risk";

describe("risk api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getAssessment gets /risk/assessment", async () => {
    mock.onGet("/risk/assessment").reply(200, { score: 42 });
    const res = await risk.getAssessment();
    expect(res.data).toEqual({ score: 42 });
    expect(mock.history.get[0].url).toBe("/risk/assessment");
  });
});
