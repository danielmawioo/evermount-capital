/**
 * Market Intelligence user-facing strings
 *
 * TODO: Replace with founder-approved strings once legal/marketing review complete.
 * Status: hold-deploy / legal freeze on provisional badge/Request Access language.
 *
 * CONSTRAINTS:
 * - DelayClass must stay DELAYED | STALE | UNAVAILABLE only (never LIVE)
 * - No fee/KYC/live-quote claims allowed
 * - Keep honesty-safe provisional wording until final approval
 */

export const MI_COPY = {
  page: {
    title: "Market Intelligence",
    subtitle: "Delayed XAU/GC market intelligence",
  },

  badges: {
    delayed: {
      label: "Delayed",
      description: "Data delayed by up to 15 minutes",
    },
    stale: {
      label: "Stale",
      description: "Data older than 15 minutes",
    },
    unavailable: {
      label: "Unavailable",
      description: "Quote data not currently available",
    },
  },

  requestAccess: {
    title: "Request Access",
    message:
      "Market intelligence features require authentication. Please sign in or contact support to request access to delayed market data.",
    ctaLabel: "Sign In",
  },

  disclaimer: {
    title: "About Market Data",
    content:
      "This data is provided for informational purposes only and should not be used as the sole basis for trading decisions.",
  },

  states: {
    loading: "Loading market data...",
    noData: "No market data available",
    noDataDetail: "Market instruments will appear here when available.",
    quoteUnavailable: "Quote data unavailable",
    quoteUnavailableDetail: "Please try again later or contact support",
    serviceUnavailable: "Service temporarily unavailable. Please try again.",
    loadFailed: "Failed to load market data",
  },

  actions: {
    refresh: "Refresh",
    retry: "Retry",
  },
} as const;
