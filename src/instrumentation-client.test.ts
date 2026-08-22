jest.mock("@sentry/nextjs", () => ({
  init: jest.fn(),
}));

describe("instrumentation-client", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("does not import or initialize Sentry when no DSN is configured", async () => {
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");

    await import("./instrumentation-client");
    await Promise.resolve();
    await Promise.resolve();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  it("initializes Sentry with the configured DSN and environment", async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://public@sentry.io/2";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");

    await import("./instrumentation-client");
    await Promise.resolve();
    await Promise.resolve();

    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: "https://public@sentry.io/2",
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
  });
});
