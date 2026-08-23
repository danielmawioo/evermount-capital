/**
 * Mock Service Worker request handlers for every endpoint under
 * `src/lib/api/*`. This lets the app run and be tested without a live
 * Evermount backend (see `yarn dev:mock` and `src/mocks/init.ts`).
 *
 * Paths use the wildcard-prefix form (an asterisk followed by the path) so a handler matches
 * regardless of `NEXT_PUBLIC_API_URL` / `API_BASE_URL` (see
 * `src/lib/api/client.ts`) — i.e. it works the same whether the app is
 * pointed at `https://api.evermount.co` or `http://localhost:3000`.
 *
 * Response shapes are adapted from the fixtures already used in each
 * module's `*.test.ts` file (axios-mock-adapter based) so this mock server
 * stays consistent with what the existing unit test suite validates.
 *
 * Handlers are grouped one file per src/lib/api/* module, mirroring that
 * directory's own layout.
 */
import { authHandlers } from "./auth";
import { usersHandlers } from "./users";
import { kycHandlers } from "./kyc";
import { walletsHandlers } from "./wallets";
import { depositsHandlers } from "./deposits";
import { withdrawalsHandlers } from "./withdrawals";
import { investmentsHandlers } from "./investments";
import { portfolioHandlers } from "./portfolio";
import { transactionsHandlers } from "./transactions";
import { dashboardHandlers } from "./dashboard";
import { riskHandlers } from "./risk";
import { documentsHandlers } from "./documents";
import { demoHandlers } from "./demo";
import { newsletterHandlers } from "./newsletter";
import { opsHandlers } from "./ops";
import { portfolioManagerHandlers } from "./portfolio-manager";
import { securityHandlers } from "./security";
import { statementsHandlers } from "./statements";
import { complianceHandlers } from "./compliance";
import { adminHandlers } from "./admin";

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...kycHandlers,
  ...walletsHandlers,
  ...depositsHandlers,
  ...withdrawalsHandlers,
  ...investmentsHandlers,
  ...portfolioHandlers,
  ...transactionsHandlers,
  ...dashboardHandlers,
  ...riskHandlers,
  ...documentsHandlers,
  ...demoHandlers,
  ...newsletterHandlers,
  ...opsHandlers,
  ...portfolioManagerHandlers,
  ...securityHandlers,
  ...statementsHandlers,
  ...complianceHandlers,
  ...adminHandlers,
];
