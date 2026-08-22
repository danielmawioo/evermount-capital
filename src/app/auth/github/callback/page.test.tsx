import { render, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import toast from "react-hot-toast";
import GitHubCallbackPage from "./page";

jest.mock("react-hot-toast", () => {
  const fn = jest.fn() as jest.Mock & { success: jest.Mock; error: jest.Mock };
  fn.success = jest.fn();
  fn.error = jest.fn();
  return {
    __esModule: true,
    default: fn,
    Toaster: () => null,
  };
});

const toastFn = toast as unknown as jest.Mock & {
  success: jest.Mock;
  error: jest.Mock;
};

const pushMock = jest.fn();
let searchParams = new URLSearchParams();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: (...args: unknown[]) => pushMock(...args),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/auth/github/callback",
  useSearchParams: () => searchParams,
}));

describe("GitHubCallbackPage", () => {
  let mock: MockAdapter;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
    toastFn.mockClear();
    toastFn.success.mockClear();
    toastFn.error.mockClear();
    pushMock.mockClear();
    searchParams = new URLSearchParams();
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    mock.restore();
    jest.restoreAllMocks();
  });

  it("redirects to login when GitHub returns an error param", async () => {
    searchParams = new URLSearchParams({ error: "access_denied" });
    render(<GitHubCallbackPage />);

    await waitFor(() =>
      expect(toastFn.error).toHaveBeenCalledWith(
        "GitHub authentication failed",
      ),
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("redirects to login when no code is present", async () => {
    render(<GitHubCallbackPage />);

    await waitFor(() =>
      expect(toastFn.error).toHaveBeenCalledWith(
        "No authorization code received",
      ),
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("exchanges the code, authenticates, stores tokens, and redirects to the dashboard", async () => {
    searchParams = new URLSearchParams({ code: "abc123" });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ accessToken: "gh-access-token" }),
    });

    mock.onPost("/auth/github").reply(200, {
      token: "app-token",
      refreshToken: "app-refresh-token",
      user: { id: "u1", email: "user@example.com", fullName: "User" },
    });

    render(<GitHubCallbackPage />);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/auth/github/callback",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ code: "abc123" }),
        }),
      ),
    );

    await waitFor(() => expect(mock.history.post?.length).toBe(1));
    expect(JSON.parse(mock.history.post![0].data)).toEqual({
      accessToken: "gh-access-token",
    });

    await waitFor(() =>
      expect(toastFn.success).toHaveBeenCalledWith("Login successful!"),
    );
    expect(localStorage.getItem("token")).toBe("app-token");
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows an error and redirects to login when the internal callback route fails", async () => {
    searchParams = new URLSearchParams({ code: "abc123" });
    fetchMock.mockResolvedValue({ ok: false, json: async () => ({}) });

    render(<GitHubCallbackPage />);

    await waitFor(() =>
      expect(toastFn.error).toHaveBeenCalledWith(
        "Authentication failed. Please try again.",
      ),
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("shows an error and redirects to login when the backend githubAuth call fails", async () => {
    searchParams = new URLSearchParams({ code: "abc123" });
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ accessToken: "gh-access-token" }),
    });

    mock.onPost("/auth/github").reply(401, {
      error: { message: "GitHub account not linked" },
    });

    render(<GitHubCallbackPage />);

    await waitFor(() =>
      expect(toastFn.error).toHaveBeenCalledWith("GitHub account not linked"),
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
  });
});
