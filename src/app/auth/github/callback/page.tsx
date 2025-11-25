"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api-client";

function GitHubCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        toast.error("GitHub authentication failed");
        router.push("/login");
        return;
      }

      if (!code) {
        toast.error("No authorization code received");
        router.push("/login");
        return;
      }

      try {
        // Exchange code for access token
        const response = await fetch("/api/auth/github/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }

        const data = await response.json();
        const { accessToken } = data;

        // Call backend with access token
        const { data: authData } = await api.auth.githubAuth({ accessToken });

        // Store token and user data
        localStorage.setItem("token", authData.token);
        if (authData.user) {
          localStorage.setItem("user", JSON.stringify(authData.user));
        }

        toast.success("Login successful!");
        router.push("/dashboard");
      } catch (err: any) {
        console.error("GitHub callback error:", err);
        toast.error("Authentication failed. Please try again.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a76f] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Completing authentication...</p>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
        )}
      </div>
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a76f] mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <GitHubCallbackContent />
    </Suspense>
  );
}

