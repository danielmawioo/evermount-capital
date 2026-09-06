"use client";

import TranslateTree from "@/app/components/TranslateTree";
// components/AuthLeftPanel.tsx
import Image from "next/image";

export default function AuthLeftPanel({ title }: { title: string }) {
  return (
    <TranslateTree>
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#f9fafb] p-10">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-500 text-sm text-center mb-8">
        More effectively with optimized workflows.
      </p>
      <Image
        src="/images/login.jpg"
        alt="Auth Visual"
        width={300}
        height={300}
      />
      <div className="flex items-center gap-4 mt-8">
        <Image src="/logos/okta.svg" alt="okta" width={24} height={24} />
        <Image
          src="/logos/firebase.svg"
          alt="firebase"
          width={24}
          height={24}
        />
        <Image src="/logos/auth0.svg" alt="auth0" width={24} height={24} />
        <Image
          src="/logos/supabase.svg"
          alt="supabase"
          width={24}
          height={24}
        />
      </div>
    </div>
  
    </TranslateTree>
  );
}
