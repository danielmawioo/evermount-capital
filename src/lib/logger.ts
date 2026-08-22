type LogContext = Record<string, unknown>;

function logToConsole(
  level: "error" | "warn" | "info",
  message: string,
  context?: LogContext
) {
  const entry = { level, message, timestamp: new Date().toISOString(), ...context };
  console[level](entry);
}

const sentryDsnConfigured = Boolean(
  process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
);

/**
 * Dynamically imported so the Sentry SDK (~70KB) is never bundled into
 * pages when no DSN is configured — see src/instrumentation*.ts.
 */
async function reportError(message: string, error?: unknown) {
  if (!sentryDsnConfigured) return;
  const Sentry = await import("@sentry/nextjs");
  if (error instanceof Error) {
    Sentry.captureException(error);
  } else {
    Sentry.captureMessage(message, "error");
  }
}

export const logger = {
  /** An operation failed. Pass the caught error so it reaches Sentry with a stack trace. */
  error(message: string, error?: unknown, context?: LogContext) {
    logToConsole("error", message, context);
    void reportError(message, error);
  },

  /** Something unexpected but non-fatal happened. */
  warn(message: string, context?: LogContext) {
    logToConsole("warn", message, context);
  },

  /** Notable app events worth recording (not errors). */
  info(message: string, context?: LogContext) {
    logToConsole("info", message, context);
  },
};
