# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Conventional Commits](https://www.conventionalcommits.org/)
for commit messages going forward.

## [Unreleased]

### Added

- Per-locale i18n copy chunks under `src/i18n/copy/` and chrome messages under `src/i18n/messages/`.
- Wallet history data layer (`useWalletHistory`) and shared `src/lib/format.ts` helpers.
- Dashboard page splits (manager clients, admin settings/managers, strategies, wallets, bank deposit) into hooks and presentational components.
- `GET /api/ready` readiness probe (`status`, `version`, `uptimeMs`) alongside liveness at `GET /api/health`.
- Sentry breadcrumbs on `logger.info` / `logger.warn` when a DSN is configured.
- `docs/ARCHITECTURE.md` describing page → hook → API client layering.
- CI coverage artifact plus a coverage table in the GitHub Actions job summary.
- Coverage floor raised to measured levels: statements 84%, lines 85%, functions 83%, branches 73%.
- Helm chart under `helm/evermount-capital/` for Kubernetes deploys (probes `/api/health` and `/api/ready`).
- Docker image pipeline (`Dockerfile`, `docker-compose.yml`, `docker-compose.k8s.yml`) tagged for the Helm chart.
- `GET /api/metrics` Prometheus process gauges (`evermount_up`, `evermount_uptime_ms`).
- Helm pod hardening (`runAsNonRoot`, read-only root, seccomp), optional image digest, ServiceMonitor, and chart README.
- CI `Infra validate` job (`helm lint` / `helm template` / kubeconform / Checkov / Hadolint / `docker compose config`).
- Weekly `yarn outdated` workflow (`.github/workflows/dep-freshness.yml`).

### Changed

- ESLint `max-lines` of 500 on `src/**/*.{ts,tsx}` (tests excluded).
- Security response headers include `Content-Security-Policy: frame-ancestors 'none'` in addition to `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and HSTS.
- `package.json` records `packageManager: yarn@1.22.22`.
- Production `sharp` resolution pinned to `^0.35.4` (libheif advisories via `next > sharp`).

### Added

- Structured logging (`src/lib/logger.ts`) and optional Sentry error tracking
  (`src/instrumentation.ts` / `src/instrumentation-client.ts`), inert unless
  `NEXT_PUBLIC_SENTRY_DSN`/`SENTRY_DSN` is configured.
- Shared Zod validation schemas (`EmailSchema`, `requiredTextSchema`,
  `minimumPasswordSchema`) applied consistently across auth, admin, and
  contact forms that previously hand-rolled their own regexes or skipped
  validation entirely.
- Prettier, integrated with ESLint, plus a `format`/`format:check` script and
  a CI gate.
- Conventional Commits enforced locally via a husky `commit-msg` hook
  (commitlint).
- This changelog.

### Changed

- Upgraded axios, Next.js, and PostCSS to patch a critical `form-data` RNG
  issue and DoS/SSRF/prototype-pollution advisories; added `resolutions`
  overrides for several transitive dependencies still pulling vulnerable
  versions. Production dependency audit went from 75 findings (33 high, 1
  critical) to 0.
- CI's dependency audit now blocks the build on production-dependency
  findings (`yarn audit --groups dependencies --level high`); a separate
  dev-tooling audit stays informational.
- Moved Vercel deploy identifiers (`VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`,
  `VERCEL_DEPLOY_HOOK`) from a plaintext workflow env block to GitHub Actions
  secrets.
- ~100 previously bare/unlogged `catch` blocks across hooks, pages, and
  components now log through `logger.error`/`logger.warn` instead of
  silently discarding the error.

### Fixed

- `getApiErrorMessage` crashed on `null`/`undefined` errors instead of
  returning its fallback message.
- `book-demo` and the Navbar/Footer newsletter forms were calling `fetch`/
  `axios` directly against a hardcoded or wrongly-resolved URL, bypassing
  `NEXT_PUBLIC_API_URL` and (for the Footer) silently hitting the frontend's
  own origin instead of the backend.
- `src/app/about/layout.tsx` was missing its default export, which broke
  `yarn build` from a clean checkout.

### Removed

- `react-use`, which was unused anywhere in `src/` and pulled in a
  vulnerable transitive `js-cookie`.

## [1.0.0] - 2026-08-22

First tagged release. Established the project's engineering baseline:

- Jest + React Testing Library test suite (130+ spec files, ~83% statement
  coverage, coverage floor enforced via `jest.config.js`).
- CI (`.github/workflows/deploy.yml`) running lint, typecheck, build, and
  tests on every push and pull request to `main`; Vercel deploy gated on all
  of them passing on `main` only.
- Extracted data/state logic out of the largest dashboard pages into
  `src/hooks/*` (`useTradingOps`, `useManagerClients`, `useAdminUsers`,
  `useAdminManagers`, `useChatWidget`), and `src/lib/api-client.ts` split
  into one file per backend domain under `src/lib/api/`.
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `Dockerfile`, and
  `docker-compose.yml`.
