"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { getUser, StoredUser } from "@/lib/auth-storage";
import { getInvestorTier, InvestorTier } from "@/lib/investor-tiers";

export interface InvestorProfile {
  id: string;
  email: string;
  fullName: string;
  kycStatus: string;
  role: StoredUser["role"];
  subscription?: {
    planType: string;
    expiresAt: string;
  } | null;
}

export function useInvestor() {
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [tier, setTier] = useState<InvestorTier>(getInvestorTier("BASIC"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getUser();
    if (!stored) {
      setLoading(false);
      return;
    }

    api.users
      .getProfile()
      .then(({ data }) => {
        const investorProfile: InvestorProfile = {
          id: data.id,
          email: data.email,
          fullName: data.fullName,
          kycStatus: data.kycStatus,
          role: data.role ?? stored.role,
          subscription: data.subscription ?? null,
        };
        setProfile(investorProfile);
        setTier(getInvestorTier(data.subscription?.planType));
      })
      .catch(() => {
        setProfile({
          id: stored.id,
          email: stored.email,
          fullName: stored.fullName,
          kycStatus: "PENDING",
          role: stored.role,
          subscription: null,
        });
        setTier(getInvestorTier(null));
      })
      .finally(() => setLoading(false));
  }, []);

  const isAdmin = profile?.role === "ADMIN";
  const isManager = profile?.role === "MANAGER";
  const isInvestor = !isAdmin && !isManager;
  const kycApproved = profile?.kycStatus === "VERIFIED";

  return {
    profile,
    tier,
    loading,
    isAdmin,
    isManager,
    isInvestor,
    kycApproved,
  };
}
