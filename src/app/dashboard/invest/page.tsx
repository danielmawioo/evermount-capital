"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvestRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/trade");
  }, [router]);

  return (
    <div className="py-12 text-center text-gray-500">Redirecting to Trade...</div>
  );
}
