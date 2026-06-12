export type PlanType = "BASIC" | "PREMIUM" | "ENTERPRISE";

export type InvestorAction =
  | "deposit"
  | "withdraw"
  | "invest"
  | "statements"
  | "customReporting"
  | "dedicatedSupport";

export interface InvestorTier {
  planType: PlanType;
  label: string;
  minInvestment: number;
  strategies: string;
  reporting: string;
  support: string;
  actions: InvestorAction[];
}

export const INVESTOR_TIERS: Record<PlanType, InvestorTier> = {
  BASIC: {
    planType: "BASIC",
    label: "Essential",
    minInvestment: 10_000,
    strategies: "Core Strategies",
    reporting: "Quarterly statements",
    support: "Email support",
    actions: ["deposit", "withdraw", "invest", "statements"],
  },
  PREMIUM: {
    planType: "PREMIUM",
    label: "Growth",
    minInvestment: 50_000,
    strategies: "Enhanced Strategies",
    reporting: "Monthly statements",
    support: "Priority support",
    actions: [
      "deposit",
      "withdraw",
      "invest",
      "statements",
      "customReporting",
      "dedicatedSupport",
    ],
  },
  ENTERPRISE: {
    planType: "ENTERPRISE",
    label: "Institutional",
    minInvestment: 250_000,
    strategies: "Institutional Strategies",
    reporting: "Monthly + custom reports",
    support: "Dedicated team",
    actions: [
      "deposit",
      "withdraw",
      "invest",
      "statements",
      "customReporting",
      "dedicatedSupport",
    ],
  },
};

export function getInvestorTier(planType?: string | null): InvestorTier {
  const key = (planType as PlanType) || "BASIC";
  return INVESTOR_TIERS[key] ?? INVESTOR_TIERS.BASIC;
}

export function canPerformAction(
  tier: InvestorTier,
  action: InvestorAction
): boolean {
  return tier.actions.includes(action);
}
