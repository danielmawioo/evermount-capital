import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { compliance } from "./compliance";

describe("compliance api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("getAuditLogs sends filter params and resolves with logs", async () => {
    const logs = [{ id: "l1", action: "login" }];
    mock.onGet("/admin/compliance/audit-logs").reply(200, { logs });

    const response = await compliance.getAuditLogs({
      from: "2024-01-01",
      to: "2024-01-31",
      action: "login",
      limit: 10,
      offset: 0,
    });

    expect(response.data).toEqual({ logs });
    expect(mock.history.get[0].params).toEqual({
      from: "2024-01-01",
      to: "2024-01-31",
      action: "login",
      limit: 10,
      offset: 0,
    });
  });

  it("getAuditLogs works without params", async () => {
    mock.onGet("/admin/compliance/audit-logs").reply(200, { logs: [] });

    const response = await compliance.getAuditLogs();

    expect(response.data).toEqual({ logs: [] });
  });

  it("exportAuditLogs requests a blob with from/to params", async () => {
    const blob = new Blob(["csv-data"]);
    mock.onGet("/admin/compliance/audit-logs/export").reply(200, blob);

    const response = await compliance.exportAuditLogs({
      from: "2024-01-01",
      to: "2024-01-31",
    });

    expect(response.data).toEqual(blob);
    expect(mock.history.get[0].params).toEqual({
      from: "2024-01-01",
      to: "2024-01-31",
    });
    expect(mock.history.get[0].responseType).toBe("blob");
  });

  it("getReport resolves with the compliance report", async () => {
    const report = { totalUsers: 100, flaggedTransactions: 2 };
    mock.onGet("/admin/compliance/report").reply(200, report);

    const response = await compliance.getReport();

    expect(response.data).toEqual(report);
  });
});
