import { logger } from "./logger";

jest.mock("@sentry/nextjs", () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}));

describe("logger", () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    consoleInfoSpy = jest.spyOn(console, "info").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("logs errors to the console with level, message, and timestamp", () => {
    logger.error("Failed to load wallet", new Error("network down"));

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    const [entry] = consoleErrorSpy.mock.calls[0];
    expect(entry).toMatchObject({
      level: "error",
      message: "Failed to load wallet",
    });
    expect(typeof entry.timestamp).toBe("string");
  });

  it("logs errors without a caught error argument", () => {
    logger.error("Unexpected state");
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });

  it("merges extra context into the logged entry", () => {
    logger.error("Credit failed", new Error("boom"), { userId: "u1" });
    const [entry] = consoleErrorSpy.mock.calls[0];
    expect(entry.userId).toBe("u1");
  });

  it("logs warnings", () => {
    logger.warn("Deprecated path used", { path: "/old" });
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy.mock.calls[0][0]).toMatchObject({
      level: "warn",
      message: "Deprecated path used",
    });
  });

  it("logs info messages", () => {
    logger.info("User signed in");
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(consoleInfoSpy.mock.calls[0][0]).toMatchObject({
      level: "info",
      message: "User signed in",
    });
  });

  it("does not attempt to load Sentry when no DSN is configured", async () => {
    // No NEXT_PUBLIC_SENTRY_DSN/SENTRY_DSN set in the test environment.
    // This should resolve without throwing even though @sentry/nextjs
    // is never imported.
    logger.error("some failure", new Error("x"));
    await Promise.resolve();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});

describe("logger (Sentry forwarding)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
  });

  it("calls Sentry.captureException with the error when a DSN is configured", async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://example@sentry.io/1";
    jest.resetModules();

    const Sentry = await import("@sentry/nextjs");
    const { logger: dsnLogger } = await import("./logger");
    const error = new Error("network down");

    dsnLogger.error("Failed to load wallet", error);
    await Promise.resolve();
    await Promise.resolve();

    expect(Sentry.captureException).toHaveBeenCalledWith(error);
    expect(Sentry.captureMessage).not.toHaveBeenCalled();
  });

  it("calls Sentry.captureMessage when a DSN is configured but no Error was caught", async () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://example@sentry.io/1";
    jest.resetModules();

    const Sentry = await import("@sentry/nextjs");
    const { logger: dsnLogger } = await import("./logger");

    dsnLogger.error("Unexpected state");
    await Promise.resolve();
    await Promise.resolve();

    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      "Unexpected state",
      "error",
    );
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });
});
