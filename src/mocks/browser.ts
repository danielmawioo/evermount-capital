import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Browser-side MSW worker, started from src/mocks/init.ts when
// NEXT_PUBLIC_API_MOCKING=enabled. Requires public/mockServiceWorker.js,
// generated via `npx msw init public/ --save`.
export const worker = setupWorker(...handlers);
