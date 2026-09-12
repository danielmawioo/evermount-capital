# Evermount Capital — Frontend

[![CI](https://github.com/danielmawioo/evermount-capital/actions/workflows/deploy.yml/badge.svg)](https://github.com/danielmawioo/evermount-capital/actions/workflows/deploy.yml)

Next.js (App Router) / TypeScript frontend for the Evermount fintech platform: public marketing site plus investor, portfolio-manager, and admin dashboards. It talks to a separate backend over a typed API client — this repo does not include the backend.

## Prerequisites

- Node.js 24.x
- Yarn 1 (Classic) — this repo's lockfile is `yarn.lock`, not `package-lock.json` or `pnpm-lock.yaml`. `package.json` pins `packageManager` to Yarn 1.22.22.
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

Open [http://localhost:3001](http://localhost:3001). (The dev server runs on 3001, not Next's default 3000, so it doesn't collide with the backend's default port — see [Prerequisites](#prerequisites).)

## Run without a backend (mock mode)

This repo talks to a separate backend that isn't included here (see [Prerequisites](#prerequisites)), so a fresh clone can't call the API until you have one running. To explore the UI or develop locally without that backend — no external accounts or services needed — run:

```bash
yarn dev:mock
```

This starts the app with every `src/lib/api/*` call served by a local [Mock Service Worker](https://mswjs.io/) (MSW) instead of a real backend. It sets `NEXT_PUBLIC_API_MOCKING=enabled`, which is read by `src/mocks/init.ts` to start the worker defined in `src/mocks/browser.ts`; request handlers for every endpoint live in `src/mocks/handlers.ts`. Mocking is off by default in `yarn dev`, `yarn build`/`yarn start`, and CI — this is purely additive, opt-in tooling that doesn't change any existing behavior.

## Test

```bash
yarn test                 # Jest + React Testing Library, with coverage
yarn test --coverage      # same; prints the coverage table
yarn typecheck            # tsc --noEmit
yarn lint                 # eslint . --max-warnings=0 (includes max-lines 500 on src)
```

`yarn test` enforces a coverage floor (`coverageThreshold` in `jest.config.js`) and fails if coverage regresses below it. CI uploads the `coverage/` directory as an artifact and prints the summary table on the job.

Liveness: `GET /api/health` (`{ status, version, timestamp }`). Readiness: `GET /api/ready` (`{ status, version, uptimeMs }`). Neither returns secrets. Layering (page → hook → API client) is documented in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

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

The image is tagged `ghcr.io/danielmawioo/evermount-capital:${IMAGE_TAG:-1.0.0}` so the same build can be pushed and used by Helm:

```bash
export IMAGE_TAG=1.0.0
docker compose build
docker compose push
```

## Kubernetes (Helm)

A chart lives at [`helm/evermount-capital/`](./helm/evermount-capital/). Liveness uses `GET /api/health`; readiness uses `GET /api/ready`. `NEXT_PUBLIC_*` values must be baked into the image at docker build time; runtime secrets go in a Kubernetes Secret referenced by `envFromSecret`.

```bash
export IMAGE_TAG=1.0.0
docker compose -f docker-compose.yml -f docker-compose.k8s.yml build
# kind load docker-image ghcr.io/danielmawioo/evermount-capital:$IMAGE_TAG
helm upgrade --install evermount ./helm/evermount-capital \
  --set image.tag=$IMAGE_TAG
```

For a local cluster that cannot pull from GHCR, use `--set image.pullPolicy=Never` or `-f helm/evermount-capital/values-local.yaml`.

## Architecture

- **App Router** under `src/app`: marketing pages at the root, authenticated dashboards under `src/app/dashboard/{admin,manager,...}`, and a couple of server-side API routes under `src/app/api` (chat proxy, GitHub OAuth callback).
- **API layer**: `src/lib/api/client.ts` holds the single Axios instance and its interceptors (a request interceptor attaches the bearer token; a response interceptor handles `401`s by refreshing the access token once via `/auth/refresh` and retrying, or clearing auth and redirecting to `/login` if the refresh itself fails). Each backend domain (`auth`, `wallets`, `admin`, `portfolioManager`, …) has its own file under `src/lib/api/`; `src/lib/api-client.ts` composes them into the typed `api.*` surface everything else imports.
- **Auth storage** (`src/lib/auth-storage.ts`): tokens live in `localStorage` (remember-me) or `sessionStorage`, mirrored into a short-lived cookie so the proxy can read auth state without an API round trip.
- **Validation** (`src/lib/schemas.ts`): Zod schemas for form inputs that reach the API layer (e.g. wallet credit amounts), used alongside `getApiErrorMessage` (`src/lib/api-error.ts`) for consistent error surfacing across dashboard pages.
- **Deployment**: GitHub Actions builds, lints, typechecks, and tests on push to `main`, then triggers a Vercel deploy hook. The backend is deployed separately (see `DEPLOYMENT_SETUP.md` and `nginx-api.evermount.co.conf`).

## Other docs in this repo

- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — page → hook → API client layering, i18n lookup, health vs ready
- [`CHANGELOG.md`](./CHANGELOG.md) — notable changes, Keep a Changelog format
- [`SECURITY.md`](./SECURITY.md) — how to report a vulnerability, what's already handled, known limitations
- [`DEPLOYMENT_SETUP.md`](./DEPLOYMENT_SETUP.md) — backend server/Nginx/HTTPS setup
- [`BACKEND_API_ENDPOINTS_PROMPT.md`](./BACKEND_API_ENDPOINTS_PROMPT.md) — backend API contract reference
- [`ESCROW_WALLET_BACKEND_PROMPT.md`](./ESCROW_WALLET_BACKEND_PROMPT.md) — escrow/wallet backend spec
- [`FRONTEND_INTEGRATION_SUMMARY.md`](./FRONTEND_INTEGRATION_SUMMARY.md) — frontend/backend integration notes
