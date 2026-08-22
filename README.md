# Evermount Capital — Frontend

[![CI](https://github.com/danielmawioo/evermount-capital/actions/workflows/deploy.yml/badge.svg)](https://github.com/danielmawioo/evermount-capital/actions/workflows/deploy.yml)

Next.js (App Router) / TypeScript frontend for the Evermount fintech platform: public marketing site plus investor, portfolio-manager, and admin dashboards. It talks to a separate backend over a typed API client — this repo does not include the backend.

## Prerequisites

- Node.js 20.x
- Yarn 1 (Classic) — this repo's lockfile is `yarn.lock`, not `package-lock.json` or `pnpm-lock.yaml`
- A running instance of the Evermount backend (see [`DEPLOYMENT_SETUP.md`](./DEPLOYMENT_SETUP.md)), or point `NEXT_PUBLIC_API_URL` at a deployed one, for any page that calls the API

## Install

```bash
yarn install
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you need:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NODE_ENV` | auto | Set by Next.js tooling — do not set manually |
| `NEXT_PUBLIC_API_URL` | yes | Backend base URL |
| `NEXT_PUBLIC_APP_URL` | yes | This app's own URL, used for OAuth redirects |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | for payments | Stripe publishable key — never put the secret key here |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` / `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | for GitHub OAuth | GitHub OAuth app credentials |
| `OPENAI_API_KEY` / `OPENAI_ORG_ID` / `OPENAI_CHAT_MODEL` | for support chat | Used server-side only, in `src/app/api/chat` |
| `NEXT_PUBLIC_ENABLE_INTERCOM` / `NEXT_PUBLIC_INTERCOM_APP_ID` | no | Alternate support widget, disabled by default |
| `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` | for local Vercel CLI use | Not needed for `yarn dev` |

See `.env.example` for the full list with inline comments.

## Run

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Test

```bash
yarn test        # Jest + React Testing Library, with coverage
yarn typecheck   # tsc --noEmit
yarn lint        # next lint
```

`yarn test` enforces a coverage floor (`coverageThreshold` in `jest.config.js`) and fails if coverage regresses below it.

CI (`.github/workflows/deploy.yml`) runs lint, typecheck, build, and tests on every push and pull request to `main`; the Vercel deploy only triggers on push to `main`, once all of them pass — never from a pull request.

## Build

```bash
yarn build
yarn start
```

## Run with Docker

This starts the frontend only, as a production build, in a container — it does not include the backend, which is a separate service (see [`DEPLOYMENT_SETUP.md`](./DEPLOYMENT_SETUP.md)). Point `NEXT_PUBLIC_API_URL` at wherever that backend is running.

```bash
cp .env.example .env.local   # fill in NEXT_PUBLIC_API_URL etc. first
docker compose up --build
```

The app is served at [http://localhost:3000](http://localhost:3000). `NEXT_PUBLIC_*` variables are baked into the client bundle at build time (via `docker-compose.yml`'s build args, sourced from your shell env or an `.env` file next to `docker-compose.yml`); server-only variables (`OPENAI_API_KEY`, `GITHUB_CLIENT_SECRET`, etc.) are read from `.env.local` at container runtime.

## Architecture

- **App Router** under `src/app`: marketing pages at the root, authenticated dashboards under `src/app/dashboard/{admin,manager,...}`, and a couple of server-side API routes under `src/app/api` (chat proxy, GitHub OAuth callback).
- **API layer**: `src/lib/api/client.ts` holds the single Axios instance and its interceptors (a request interceptor attaches the bearer token; a response interceptor handles `401`s by refreshing the access token once via `/auth/refresh` and retrying, or clearing auth and redirecting to `/login` if the refresh itself fails). Each backend domain (`auth`, `wallets`, `admin`, `portfolioManager`, …) has its own file under `src/lib/api/`; `src/lib/api-client.ts` composes them into the typed `api.*` surface everything else imports.
- **Auth storage** (`src/lib/auth-storage.ts`): tokens live in `localStorage` (remember-me) or `sessionStorage`, mirrored into a short-lived cookie so middleware can read auth state without an API round trip.
- **Validation** (`src/lib/schemas.ts`): Zod schemas for form inputs that reach the API layer (e.g. wallet credit amounts), used alongside `getApiErrorMessage` (`src/lib/api-error.ts`) for consistent error surfacing across dashboard pages.
- **Deployment**: GitHub Actions builds, lints, typechecks, and tests on push to `main`, then triggers a Vercel deploy hook. The backend is deployed separately (see `DEPLOYMENT_SETUP.md` and `nginx-api.evermount.co.conf`).

## Other docs in this repo

- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — setup, commit/PR conventions, project structure, testing conventions
- [`CHANGELOG.md`](./CHANGELOG.md) — notable changes, Keep a Changelog format
- [`SECURITY.md`](./SECURITY.md) — how to report a vulnerability, what's already handled, known limitations
- [`DEPLOYMENT_SETUP.md`](./DEPLOYMENT_SETUP.md) — backend server/Nginx/HTTPS setup
- [`BACKEND_API_ENDPOINTS_PROMPT.md`](./BACKEND_API_ENDPOINTS_PROMPT.md) — backend API contract reference
- [`ESCROW_WALLET_BACKEND_PROMPT.md`](./ESCROW_WALLET_BACKEND_PROMPT.md) — escrow/wallet backend spec
- [`FRONTEND_INTEGRATION_SUMMARY.md`](./FRONTEND_INTEGRATION_SUMMARY.md) — frontend/backend integration notes
