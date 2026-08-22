import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { auth } from "./auth";

describe("auth api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("register posts registration data", async () => {
    const data = {
      email: "new@example.com",
      password: "password123",
      fullName: "New User",
    };
    mock.onPost("/auth/register").reply(201, { id: "u1" });

    const response = await auth.register(data);

    expect(response.data).toEqual({ id: "u1" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("login posts credentials", async () => {
    const data = { email: "user@example.com", password: "password123" };
    mock.onPost("/auth/login").reply(200, { token: "tok" });

    const response = await auth.login(data);

    expect(response.data).toEqual({ token: "tok" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("googleAuth posts the access token", async () => {
    const data = { accessToken: "g-token" };
    mock.onPost("/auth/google").reply(200, { token: "tok" });

    const response = await auth.googleAuth(data);

    expect(response.data).toEqual({ token: "tok" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("githubAuth posts the access token", async () => {
    const data = { accessToken: "gh-token" };
    mock.onPost("/auth/github").reply(200, { token: "tok" });

    const response = await auth.githubAuth(data);

    expect(response.data).toEqual({ token: "tok" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("xAuth posts the access token", async () => {
    const data = { accessToken: "x-token" };
    mock.onPost("/auth/x").reply(200, { token: "tok" });

    const response = await auth.xAuth(data);

    expect(response.data).toEqual({ token: "tok" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("appleAuth posts the id token", async () => {
    const data = { idToken: "apple-id-token" };
    mock.onPost("/auth/apple").reply(200, { token: "tok" });

    const response = await auth.appleAuth(data);

    expect(response.data).toEqual({ token: "tok" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("sendResetPassword posts the email", async () => {
    const data = { email: "user@example.com" };
    mock.onPost("/auth/send-reset-password").reply(200, { success: true });

    const response = await auth.sendResetPassword(data);

    expect(response.data).toEqual({ success: true });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("resetPassword posts email/otp/newPassword", async () => {
    const data = {
      email: "user@example.com",
      otp: "123456",
      newPassword: "newpass123",
    };
    mock.onPost("/auth/reset-password").reply(200, { success: true });

    const response = await auth.resetPassword(data);

    expect(response.data).toEqual({ success: true });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("verifyEmail posts the verification token", async () => {
    const data = { token: "verify-token" };
    mock.onPost("/auth/verify-email").reply(200, { success: true });

    const response = await auth.verifyEmail(data);

    expect(response.data).toEqual({ success: true });
    expect(JSON.parse(mock.history.post[0].data)).toEqual(data);
  });

  it("refreshToken posts the refresh token wrapped in an object", async () => {
    mock.onPost("/auth/refresh").reply(200, { token: "new-token" });

    const response = await auth.refreshToken("refresh-token-value");

    expect(response.data).toEqual({ token: "new-token" });
    expect(JSON.parse(mock.history.post[0].data)).toEqual({
      refreshToken: "refresh-token-value",
    });
  });

  it("logout posts with no body", async () => {
    mock.onPost("/auth/logout").reply(200, { success: true });

    const response = await auth.logout();

    expect(response.data).toEqual({ success: true });
    expect(mock.history.post[0].url).toBe("/auth/logout");
  });
});
