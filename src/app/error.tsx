"use client";

import { useEffect } from "react";
import Link from "next/link";
import { logger } from "@/lib/logger";
import TranslateTree from "@/app/components/TranslateTree";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Unhandled render error", error, { digest: error.digest });
  }, [error]);

  return (
    <TranslateTree>
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0f1117] px-6 py-16 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        An unexpected error occurred. It&apos;s been logged — try again, or head
        back to the homepage.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-[#00a76f] hover:bg-[#029866] text-white text-sm font-semibold shadow-md transition-all duration-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-all duration-200"
        >
          Go to Home
        </Link>
      </div>
    </main>
    </TranslateTree>
  );
}
