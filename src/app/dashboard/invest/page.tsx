"use client";

import TranslateTree from "@/app/components/TranslateTree";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvestRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/trade");
  }, [router]);

  return (
    <TranslateTree>
      <div className="py-12 text-center text-gray-500">
        Redirecting to Trade...
      </div>
    </TranslateTree>
  );
}
