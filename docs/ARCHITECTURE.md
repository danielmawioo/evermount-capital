# Architecture

Evermount Capital is a Next.js App Router frontend. Pages stay thin: they render JSX and delegate fetching, filters, and mutations to hooks. Hooks call the typed API client; the client talks to the Evermount backend.

```
Page (JSX) → hook (src/hooks) → api-client (src/lib/api/*) → backend
                 ↘ lib/format (display helpers)
```

## Layers

- **Pages** (`src/app/**/page.tsx`) compose presentational components. Dashboard routes under `/dashboard` are authenticated UI; marketing routes are public.
- **Hooks** (`src/hooks/*`) own React state, pagination, and side effects. Do not duplicate a page-specific wrapper around an existing hook.
- **API client** (`src/lib/api-client.ts` + `src/lib/api/`) maps one file per backend domain (wallets, deposits, portfolio-manager, admin, …).
- **Formatting** (`src/lib/format.ts`) holds currency, status, and transaction display helpers shared across wallets and clients.
- **Logging** (`src/lib/logger.ts`) emits `{ level, message, timestamp, ...context }`. Errors go to Sentry `captureException` when a DSN is set; info/warn add Sentry breadcrumbs.

## i18n

Copy is keyed lookup, not inline strings on marketing pages. Chrome and site dictionaries live in `src/i18n/messages/<locale>.ts`. Long site copy is chunked under `src/i18n/copy/<locale>/` (each file under 500 lines) and merged in `src/i18n/messages/index.ts`. `LocaleContext` reads the public `messages` export.

## Health vs ready

| Endpoint | Role | Body |
| --- | --- | --- |
| `GET /api/health` | Liveness | `{ status, version, timestamp }` — this process only; does not call the backend |
| `GET /api/ready` | Readiness | `{ status, version, uptimeMs }` — no secrets, env dumps, or backend probes |

Uptime monitors should hit `/api/health`. Orchestrators that wait for a process to boot can hit `/api/ready`. The Helm chart at `helm/evermount-capital/` wires those paths as liveness and readiness probes.

## Size limit

ESLint `max-lines` is 500 for `src/**/*.{ts,tsx}` (tests excluded) so new god files cannot land unnoticed.
