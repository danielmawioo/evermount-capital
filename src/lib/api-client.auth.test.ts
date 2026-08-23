/**
 * @jest-environment node
 *
 * MSW's Node server (`msw/node`) intercepts requests at the Node.js
 * `http`/`https` module level. jsdom's `XMLHttpRequest` (this repo's
 * default `testEnvironment`) doesn't expose the Fetch API globals
 * (`Request`/`Response`) that `msw/node` needs, so this one file opts into
 * the plain Node test environment — which also means axios uses its
 * `http` adapter here instead of the `xhr` adapter, a closer match to how
 * requests actually flow through `msw/node` in production Node contexts.
 */
import { server } from "@/mocks/server";
import { api } from "./api-client";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("api.auth", () => {
  it("register resolves with the created user echoed by the mock handler", async () => {
    const response = await api.auth.register({
      email: "new@example.com",
      password: "password123",
      fullName: "New User",
    });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({
      id: "user-mock-1",
      email: "new@example.com",
      fullName: "New User",
    });
  });

  it("login resolves with tokens and user fixture", async () => {
    const response = await api.auth.login({
      email: "investor@example.com",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      token: "mock-access-token",
      refreshToken: "mock-refresh-token",
      user: {
        id: "user-mock-1",
        email: "investor@example.com",
        fullName: "Mock Investor",
      },
    });
  });

  it("googleAuth resolves with a mock token", async () => {
    const response = await api.auth.googleAuth({ accessToken: "g-token" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ token: "mock-access-token" });
  });

  it("githubAuth resolves with a mock token", async () => {
    const response = await api.auth.githubAuth({ accessToken: "gh-token" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ token: "mock-access-token" });
  });

  it("xAuth resolves with a mock token", async () => {
    const response = await api.auth.xAuth({ accessToken: "x-token" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ token: "mock-access-token" });
  });

  it("appleAuth resolves with a mock token", async () => {
    const response = await api.auth.appleAuth({ idToken: "apple-token" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ token: "mock-access-token" });
  });

  it("sendResetPassword resolves with success", async () => {
    const response = await api.auth.sendResetPassword({
      email: "investor@example.com",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("resetPassword resolves with success", async () => {
    const response = await api.auth.resetPassword({
      email: "investor@example.com",
      otp: "123456",
      newPassword: "newpassword123",
    });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("verifyEmail resolves with success", async () => {
    const response = await api.auth.verifyEmail({ token: "verify-token" });
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });

  it("refreshToken resolves with new tokens", async () => {
    const response = await api.auth.refreshToken("mock-refresh-token");
    expect(response.status).toBe(200);
    expect(response.data).toEqual({
      token: "mock-access-token",
      refreshToken: "mock-refresh-token",
    });
  });

  it("logout resolves with success", async () => {
    const response = await api.auth.logout();
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ success: true });
  });
});
