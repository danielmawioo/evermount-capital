import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  setUser,
  getUser,
  clearAuth,
  usesPersistentStorage,
} from "./auth-storage";

function getCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function clearAllCookies() {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name) {
      document.cookie = `${name}=; path=/; max-age=0`;
    }
  });
}

describe("auth-storage", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();
  });

  describe("getAccessToken / getRefreshToken", () => {
    it("returns null when nothing is stored", () => {
      expect(getAccessToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();
    });

    it("prefers localStorage over sessionStorage", () => {
      localStorage.setItem("token", "local-token");
      sessionStorage.setItem("token", "session-token");
      expect(getAccessToken()).toBe("local-token");

      localStorage.setItem("refreshToken", "local-refresh");
      sessionStorage.setItem("refreshToken", "session-refresh");
      expect(getRefreshToken()).toBe("local-refresh");
    });

    it("falls back to sessionStorage when localStorage is empty", () => {
      sessionStorage.setItem("token", "session-token");
      expect(getAccessToken()).toBe("session-token");

      sessionStorage.setItem("refreshToken", "session-refresh");
      expect(getRefreshToken()).toBe("session-refresh");
    });
  });

  describe("setAuthTokens", () => {
    it("stores tokens in localStorage and clears sessionStorage when rememberMe is true", () => {
      sessionStorage.setItem("token", "stale-session-token");
      sessionStorage.setItem("refreshToken", "stale-session-refresh");

      setAuthTokens("access-1", "refresh-1", true);

      expect(localStorage.getItem("token")).toBe("access-1");
      expect(localStorage.getItem("refreshToken")).toBe("refresh-1");
      expect(sessionStorage.getItem("token")).toBeNull();
      expect(sessionStorage.getItem("refreshToken")).toBeNull();
    });

    it("stores tokens in sessionStorage and clears localStorage when rememberMe is false", () => {
      localStorage.setItem("token", "stale-local-token");
      localStorage.setItem("refreshToken", "stale-local-refresh");

      setAuthTokens("access-2", "refresh-2", false);

      expect(sessionStorage.getItem("token")).toBe("access-2");
      expect(sessionStorage.getItem("refreshToken")).toBe("refresh-2");
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("refreshToken")).toBeNull();
    });

    it("sets the auth cookie with the access token", () => {
      setAuthTokens("access-3", "refresh-3", true);
      expect(getCookie("evermount_token")).toBe("access-3");
    });
  });

  describe("setUser / getUser", () => {
    const user = {
      id: "1",
      email: "a@b.com",
      fullName: "A B",
      role: "INVESTOR" as const,
    };

    it("round-trips a user through localStorage when rememberMe is true", () => {
      setUser(user, true);
      expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
      expect(getUser()).toEqual(user);
    });

    it("round-trips a user through sessionStorage when rememberMe is false", () => {
      setUser(user, false);
      expect(sessionStorage.getItem("user")).toBe(JSON.stringify(user));
      expect(getUser()).toEqual(user);
    });

    it("returns null when no user is stored", () => {
      expect(getUser()).toBeNull();
    });

    it("returns null gracefully when stored JSON is corrupt", () => {
      localStorage.setItem("user", "{not valid json");
      expect(getUser()).toBeNull();
    });
  });

  describe("clearAuth", () => {
    it("clears tokens and user from both storages and the auth cookie", () => {
      setAuthTokens("access", "refresh", true);
      setUser({ id: "1", email: "a@b.com", fullName: "A", role: "INVESTOR" }, true);
      sessionStorage.setItem("token", "leftover");

      clearAuth();

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("refreshToken")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
      expect(sessionStorage.getItem("token")).toBeNull();
      expect(sessionStorage.getItem("refreshToken")).toBeNull();
      expect(sessionStorage.getItem("user")).toBeNull();
      expect(getCookie("evermount_token")).toBeNull();
    });
  });

  describe("usesPersistentStorage", () => {
    it("returns true when an access token exists in localStorage", () => {
      localStorage.setItem("token", "access");
      expect(usesPersistentStorage()).toBe(true);
    });

    it("returns false when the access token only exists in sessionStorage", () => {
      sessionStorage.setItem("token", "access");
      expect(usesPersistentStorage()).toBe(false);
    });

    it("returns false when no token exists anywhere", () => {
      expect(usesPersistentStorage()).toBe(false);
    });
  });
});
