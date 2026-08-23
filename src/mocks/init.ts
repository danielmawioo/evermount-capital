// Starts the MSW mock backend in the browser so the app can run against a
// mocked API instead of the live Evermount backend (see `yarn dev:mock`).
//
// Dynamically imported so this — and the msw/browser bundle it pulls in —
// adds zero bytes to the client bundle when mocking is disabled, which is
// the default in normal dev, production, and CI. Mirrors the pattern used
// in src/instrumentation-client.ts for the optional Sentry SDK.
if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("./browser").then(({ worker }) => {
    worker.start({ onUnhandledRequest: "bypass" });
  });
}

export {};
