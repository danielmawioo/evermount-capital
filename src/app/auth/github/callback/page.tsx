"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function GitHubCallbackContent() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Social sign-in is not available. Use email and password.");
    router.push("/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <p className="text-gray-600 dark:text-gray-400">
        Redirecting to sign in…
      </p>
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      }
    >
      <GitHubCallbackContent />
    </Suspense>
  );
}
