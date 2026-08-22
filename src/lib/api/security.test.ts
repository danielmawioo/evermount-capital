import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { security } from "./security";

describe("security api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("mfa.getStatus gets /admin/security/mfa/status", async () => {
    mock.onGet("/admin/security/mfa/status").reply(200, { enabled: false });
    const res = await security.mfa.getStatus();
    expect(res.data).toEqual({ enabled: false });
    expect(mock.history.get[0].url).toBe("/admin/security/mfa/status");
  });

  it("mfa.setup posts to /admin/security/mfa/setup", async () => {
    mock
      .onPost("/admin/security/mfa/setup")
      .reply(200, { secret: "abc", qrCode: "data:image/png;base64," });
    const res = await security.mfa.setup();
    expect(res.data).toEqual({ secret: "abc", qrCode: "data:image/png;base64," });
    expect(mock.history.post[0].url).toBe("/admin/security/mfa/setup");
  });

  it("mfa.enable posts token to /admin/security/mfa/enable", async () => {
    mock.onPost("/admin/security/mfa/enable").reply(200, { enabled: true });
    const res = await security.mfa.enable({ token: "123456" });
    expect(res.data).toEqual({ enabled: true });
    const req = mock.history.post[0];
    expect(req.url).toBe("/admin/security/mfa/enable");
    expect(JSON.parse(req.data)).toEqual({ token: "123456" });
  });

  it("mfa.disable posts token to /admin/security/mfa/disable", async () => {
    mock.onPost("/admin/security/mfa/disable").reply(200, { enabled: false });
    const res = await security.mfa.disable({ token: "654321" });
    expect(res.data).toEqual({ enabled: false });
    const req = mock.history.post[0];
    expect(req.url).toBe("/admin/security/mfa/disable");
    expect(JSON.parse(req.data)).toEqual({ token: "654321" });
  });
});
