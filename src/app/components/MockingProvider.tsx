"use client";

import { useEffect } from "react";

/**
 * Bootstraps the MSW mock backend (src/mocks/init.ts) when
 * NEXT_PUBLIC_API_MOCKING=enabled (see `yarn dev:mock`).
 *
 * Unlike src/instrumentation-client.ts — which Next.js auto-loads for every
 * client bundle — the App Router doesn't auto-run arbitrary client modules,
 * so this component provides the explicit wiring, rendered once from the
 * root layout. It renders nothing and, when mocking is disabled (the
 * default in dev/prod/CI), never touches the dynamic import at all.
 */
export default function MockingProvider() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      import("@/mocks/init");
    }
  }, []);

  return null;
}
