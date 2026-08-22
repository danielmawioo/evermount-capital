import MockAdapter from "axios-mock-adapter";
import { apiClient, API_BASE_URL } from "./client";
import { statements } from "./statements";

describe("statements api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("list gets /statements", async () => {
    mock.onGet("/statements").reply(200, { statements: [] });
    const res = await statements.list();
    expect(res.data).toEqual({ statements: [] });
    expect(mock.history.get[0].url).toBe("/statements");
  });

  it("downloadUrl builds an absolute URL for the statement id", () => {
    const url = statements.downloadUrl("stmt-1");
    expect(url).toBe(`${API_BASE_URL}/statements/stmt-1/download`);
  });

  it("generateBatch posts with year/month query params and null body", async () => {
    mock
      .onPost("/admin/statements/generate")
      .reply(200, { generated: true });
    const res = await statements.generateBatch(2026, 8);
    expect(res.data).toEqual({ generated: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/admin/statements/generate");
    expect(req.params).toEqual({ year: 2026, month: 8 });
    expect(req.data === undefined || JSON.parse(req.data) === null).toBe(
      true,
    );
  });
});
