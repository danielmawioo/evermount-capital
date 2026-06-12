const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";
const AUTH_COOKIE = "evermount_token";
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes, matches backend JWT

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY)
    ? localStorage
    : sessionStorage.getItem(TOKEN_KEY)
      ? sessionStorage
      : localStorage.getItem(REFRESH_TOKEN_KEY)
        ? localStorage
        : sessionStorage;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY)
  );
}

function setAuthCookie(token: string) {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${ACCESS_TOKEN_MAX_AGE}; SameSite=Lax${secure}`;
}

function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function setAuthTokens(
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean
) {
  const storage = rememberMe ? localStorage : sessionStorage;
  const other = rememberMe ? sessionStorage : localStorage;

  storage.setItem(TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  other.removeItem(TOKEN_KEY);
  other.removeItem(REFRESH_TOKEN_KEY);

  setAuthCookie(accessToken);
}

export function setUser(user: unknown, rememberMe: boolean) {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  clearAuthCookie();
}

export function usesPersistentStorage(): boolean {
  return typeof window !== "undefined" && !!localStorage.getItem(TOKEN_KEY);
}

export interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  role: "INVESTOR" | "MANAGER" | "ADMIN" | "SUPPORT";
  isVerified?: boolean;
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}
