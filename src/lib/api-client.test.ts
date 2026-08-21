import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import apiClient from "./api-client";
import { setAuthTokens, getAccessToken, getRefreshToken } from "./auth-storage";

describe("apiClient 401 refresh-retry interceptor", () => {
  let clientMock: MockAdapter;
  let globalMock: MockAdapter;

  beforeEach(() => {
    clientMock = new MockAdapter(apiClient);
    globalMock = new MockAdapter(axios);
    localStorage.clear();
    sessionStorage.clear();
    setAuthTokens("stale-access-token", "valid-refresh-token", true);
  });

  afterEach(() => {
    clientMock.restore();
    globalMock.restore();
  });

  it("refreshes the access token and retries the original request on a 401", async () => {
    clientMock
      .onGet("/wallets/balance")
      .replyOnce(401)
      .onGet("/wallets/balance")
      .replyOnce((config) => {
        expect(config.headers?.Authorization).toBe("Bearer new-access-token");
        return [200, { balance: 100 }];
      });

    globalMock.onPost(/\/auth\/refresh$/).replyOnce(200, {
      token: "new-access-token",
      refreshToken: "new-refresh-token",
    });

    const response = await apiClient.get("/wallets/balance");

    expect(response.data).toEqual({ balance: 100 });
    expect(getAccessToken()).toBe("new-access-token");
    expect(getRefreshToken()).toBe("new-refresh-token");
  });

  it("does not retry more than once for the same request", async () => {
    clientMock.onGet("/wallets/balance").reply(401);
    globalMock.onPost(/\/auth\/refresh$/).replyOnce(200, {
      token: "new-access-token",
      refreshToken: "new-refresh-token",
    });

    await expect(apiClient.get("/wallets/balance")).rejects.toBeTruthy();
    expect(clientMock.history.get?.length).toBe(2);
  });

  it("clears auth when the refresh request itself fails", async () => {
    clientMock.onGet("/wallets/balance").reply(401);
    globalMock.onPost(/\/auth\/refresh$/).replyOnce(401);

    await expect(apiClient.get("/wallets/balance")).rejects.toBeTruthy();

    expect(getAccessToken()).toBeNull();
    expect(getRefreshToken()).toBeNull();
  });

  it("skips refresh and clears auth on a 401 from the refresh endpoint itself", async () => {
    clientMock.onPost("/auth/refresh").reply(401);

    await expect(
      apiClient.post("/auth/refresh", { refreshToken: "valid-refresh-token" })
    ).rejects.toBeTruthy();

    expect(getAccessToken()).toBeNull();
    expect(getRefreshToken()).toBeNull();
  });
});
