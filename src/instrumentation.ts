const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

// Node.js runtime only: the edge runtime (used by middleware.ts) bundles
// everything into one script with no lazy-loading, so importing the Sentry
// SDK there — even dynamically — would add ~60KB to every edge request
// regardless of whether a DSN is configured.
export async function register() {
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;

  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
  });
}

export async function onRequestError(
  ...args: Parameters<typeof import("@sentry/nextjs").captureRequestError>
) {
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(...args);
}
