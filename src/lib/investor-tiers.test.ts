import { getInvestorTier, canPerformAction, INVESTOR_TIERS } from "./investor-tiers";

describe("getInvestorTier", () => {
  it("returns the BASIC tier for 'BASIC'", () => {
    expect(getInvestorTier("BASIC")).toEqual(INVESTOR_TIERS.BASIC);
  });

  it("returns the PREMIUM tier for 'PREMIUM'", () => {
    expect(getInvestorTier("PREMIUM")).toEqual(INVESTOR_TIERS.PREMIUM);
  });

  it("returns the ENTERPRISE tier for 'ENTERPRISE'", () => {
    expect(getInvestorTier("ENTERPRISE")).toEqual(INVESTOR_TIERS.ENTERPRISE);
  });

  it("falls back to BASIC when planType is null", () => {
    expect(getInvestorTier(null)).toEqual(INVESTOR_TIERS.BASIC);
  });

  it("falls back to BASIC when planType is undefined", () => {
    expect(getInvestorTier(undefined)).toEqual(INVESTOR_TIERS.BASIC);
  });

  it("falls back to BASIC for an unknown plan type", () => {
    expect(getInvestorTier("UNKNOWN_PLAN")).toEqual(INVESTOR_TIERS.BASIC);
  });
});

describe("canPerformAction", () => {
  it("returns true for actions included in the tier", () => {
    expect(canPerformAction(INVESTOR_TIERS.BASIC, "deposit")).toBe(true);
  });

  it("returns false for actions not included in the tier", () => {
    expect(canPerformAction(INVESTOR_TIERS.BASIC, "customReporting")).toBe(false);
  });

  it("returns true for premium-only actions on the PREMIUM tier", () => {
    expect(canPerformAction(INVESTOR_TIERS.PREMIUM, "customReporting")).toBe(true);
  });
});
