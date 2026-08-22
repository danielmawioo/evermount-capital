import { renderHook, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import { setAuthTokens, setUser } from "@/lib/auth-storage";
import { useInvestor } from "./useInvestor";

describe("useInvestor", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    mock.restore();
    localStorage.clear();
    sessionStorage.clear();
  });

  it("resolves loading to false with no profile when there is no stored user", async () => {
    const { result } = renderHook(() => useInvestor());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.profile).toBeNull();
    expect(mock.history.get?.length ?? 0).toBe(0);
  });

  it("populates the profile from the API response when getProfile succeeds", async () => {
    setAuthTokens("access", "refresh", true);
    setUser(
      { id: "1", email: "stored@example.com", fullName: "Stored User", role: "INVESTOR" },
      true
    );
    mock.onGet("/users/profile").reply(200, {
      id: "1",
      email: "api@example.com",
      fullName: "API User",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
      subscription: { planType: "PREMIUM", expiresAt: "2027-01-01" },
    });

    const { result } = renderHook(() => useInvestor());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.profile).toEqual({
      id: "1",
      email: "api@example.com",
      fullName: "API User",
      kycStatus: "VERIFIED",
      role: "INVESTOR",
      subscription: { planType: "PREMIUM", expiresAt: "2027-01-01" },
    });
    expect(result.current.tier.planType).toBe("PREMIUM");
    expect(result.current.kycApproved).toBe(true);
    expect(result.current.isInvestor).toBe(true);
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isManager).toBe(false);
  });

  it("falls back to the stored user with PENDING kyc when getProfile fails", async () => {
    setAuthTokens("access", "refresh", true);
    setUser(
      { id: "2", email: "stored@example.com", fullName: "Stored User", role: "MANAGER" },
      true
    );
    mock.onGet("/users/profile").reply(500);

    const { result } = renderHook(() => useInvestor());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.profile).toEqual({
      id: "2",
      email: "stored@example.com",
      fullName: "Stored User",
      kycStatus: "PENDING",
      role: "MANAGER",
      subscription: null,
    });
    expect(result.current.kycApproved).toBe(false);
    expect(result.current.isManager).toBe(true);
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isInvestor).toBe(false);
    expect(result.current.tier.planType).toBe("BASIC");
  });
});
