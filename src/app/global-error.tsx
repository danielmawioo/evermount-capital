"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

/**
 * Catches errors thrown by the root layout itself (rare — most errors are
 * caught by error.tsx instead). Must render its own <html>/<body> since it
 * replaces the root layout entirely while active.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Unhandled root layout error", error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            An unexpected error occurred. It&apos;s been logged — try reloading
            the page.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#00a76f] hover:bg-[#029866] text-white text-sm font-semibold shadow-md transition-all duration-200"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
