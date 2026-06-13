"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInvestor } from "@/hooks/useInvestor";
import type { StoredUser } from "@/lib/auth-storage";

type AppRole = StoredUser["role"];

interface RoleGateProps {
  allowed: AppRole[];
  children: React.ReactNode;
}

export default function RoleGate({ allowed, children }: RoleGateProps) {
  const router = useRouter();
  const { profile, loading } = useInvestor();

  useEffect(() => {
    if (loading) return;
    if (!profile) {
      router.replace("/login");
      return;
    }
    if (!allowed.includes(profile.role)) {
      router.replace("/dashboard");
    }
  }, [allowed, loading, profile, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00a76f]" />
      </div>
    );
  }

  if (!profile || !allowed.includes(profile.role)) {
    return null;
  }

  return <>{children}</>;
}
