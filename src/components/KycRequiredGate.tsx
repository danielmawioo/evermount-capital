"use client";

import Link from "next/link";
import { useInvestor } from "@/hooks/useInvestor";

interface KycRequiredGateProps {
  children: React.ReactNode;
  action?: string;
}

export default function KycRequiredGate({
  children,
  action = "continue",
}: KycRequiredGateProps) {
  const { kycApproved, loading } = useInvestor();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00a76f]" />
      </div>
    );
  }

  if (!kycApproved) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white dark:bg-[#161a23] p-8 rounded-lg border text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Verification Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete KYC verification before you can {action}.
          </p>
          <Link
            href="/dashboard/kyc"
            className="inline-block bg-[#00a76f] text-white px-6 py-2.5 rounded-lg font-semibold"
          >
            Complete Verification
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
