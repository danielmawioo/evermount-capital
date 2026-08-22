jest.mock("@sentry/nextjs", () => ({
  init: jest.fn(),
  captureRequestError: jest.fn(),
}));

describe("instrumentation.register", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("does not initialize Sentry when no DSN is configured", async () => {
    delete process.env.SENTRY_DSN;
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;
    process.env.NEXT_RUNTIME = "nodejs";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");
    const { register } = await import("./instrumentation");

    await register();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  it("does not initialize Sentry outside the Node.js runtime", async () => {
    process.env.SENTRY_DSN = "https://example@sentry.io/1";
    process.env.NEXT_RUNTIME = "edge";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");
    const { register } = await import("./instrumentation");

    await register();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  it("initializes Sentry when a DSN is configured on the Node.js runtime", async () => {
    process.env.SENTRY_DSN = "https://example@sentry.io/1";
    process.env.NEXT_RUNTIME = "nodejs";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");
    const { register } = await import("./instrumentation");

    await register();

    expect(Sentry.init).toHaveBeenCalledWith({
      dsn: "https://example@sentry.io/1",
      tracesSampleRate: 0.1,
      environment: process.env.NODE_ENV,
    });
  });

  it("falls back to NEXT_PUBLIC_SENTRY_DSN when SENTRY_DSN is unset", async () => {
    delete process.env.SENTRY_DSN;
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://public@sentry.io/2";
    process.env.NEXT_RUNTIME = "nodejs";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");
    const { register } = await import("./instrumentation");

    await register();

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({ dsn: "https://public@sentry.io/2" }),
    );
  });
});

describe("instrumentation.onRequestError", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("does not report to Sentry when no DSN is configured", async () => {
    delete process.env.SENTRY_DSN;
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;
    process.env.NEXT_RUNTIME = "nodejs";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");
    const { onRequestError } = await import("./instrumentation");

    await onRequestError(
      new Error("boom"),
      { path: "/api/chat", method: "POST", headers: {} },
      { routerKind: "App Router", routePath: "/api/chat", routeType: "route" },
    );

    expect(Sentry.captureRequestError).not.toHaveBeenCalled();
  });

  it("forwards the error to Sentry when a DSN is configured on the Node.js runtime", async () => {
    process.env.SENTRY_DSN = "https://example@sentry.io/1";
    process.env.NEXT_RUNTIME = "nodejs";

    jest.resetModules();
    const Sentry = await import("@sentry/nextjs");
    const { onRequestError } = await import("./instrumentation");

    const error = new Error("boom");
    const requestInfo = { path: "/api/chat", method: "POST", headers: {} };
    const errorContext = {
      routerKind: "App Router",
      routePath: "/api/chat",
      routeType: "route",
    };
    await onRequestError(error, requestInfo, errorContext);

    expect(Sentry.captureRequestError).toHaveBeenCalledWith(
      error,
      requestInfo,
      errorContext,
    );
  });
});
