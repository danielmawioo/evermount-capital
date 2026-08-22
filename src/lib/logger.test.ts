import { logger } from "./logger";

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
    expect(entry).toMatchObject({ level: "error", message: "Failed to load wallet" });
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
