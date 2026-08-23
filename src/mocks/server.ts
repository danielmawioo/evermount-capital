import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Node-side MSW server for Jest integration tests (see
// src/lib/api/deposits.integration.test.ts). Only started by tests that
// explicitly opt in via `server.listen()` in their own beforeAll/afterAll —
// importing this module has no side effects on its own.
export const server = setupServer(...handlers);
