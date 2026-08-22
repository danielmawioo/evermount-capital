const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

// Dynamically imported so unconfigured deployments never ship the Sentry
// SDK to the browser (it's ~70KB and otherwise gets bundled into every page).
if (dsn) {
  import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
  });
}

export {};
