# Security Policy

## Reporting a vulnerability

If you find a security issue in this repository, please report it privately rather than opening a public issue:

- Email: support@evermount.co
- Include: affected file/endpoint, reproduction steps, and impact.

We aim to acknowledge reports within 3 business days.

## Scope

This repository is the Next.js frontend only. It does not include:

- The backend API (separate repository — see [`DEPLOYMENT_SETUP.md`](./DEPLOYMENT_SETUP.md))
- Infrastructure/deployment credentials (Vercel, DNS, server access)

Vulnerabilities in the backend or infrastructure should be reported the same way, but may need to be routed to the relevant repository/owner.

## What this repo already does

- No secrets are committed. `.env`, `.env.local`, and friends are gitignored; `.env.example` documents required variables without values.
- Auth tokens live in `localStorage`/`sessionStorage`, never in a plain cookie usable cross-site (see `src/lib/auth-storage.ts`).
- Input reaching the API layer from forms (deposit/withdrawal amounts, admin wallet credits) is validated with [Zod](https://zod.dev/) schemas (`src/lib/schemas.ts`) before it's sent.
- Dependabot is configured (`.github/dependabot.yml`) for weekly npm and GitHub Actions updates.
- CI runs `yarn audit --groups dependencies --level high` on every push and pull request and **fails the build** on any high/critical advisory in a production dependency (`package.json`'s `resolutions` field pins several transitive packages — `nanoid`, `postcss`, `lodash`, `sharp`, `yaml`, and a scoped `picomatch` override — to patched versions that their parent packages hadn't picked up yet).
- Response headers in `next.config.ts` set `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'`, `Permissions-Policy`, and HSTS (`max-age=63072000; includeSubDomains; preload`). `/api/health`, `/api/ready`, and `/api/metrics` never return secrets. The Helm chart can emit a NetworkPolicy and PodDisruptionBudget.

## Known limitations

- A separate `yarn audit --groups devDependencies --level high` step always writes findings to the GitHub Actions job summary and does not fail the build — dev-only tooling (Jest's dependency tree in particular) carries a long tail of advisories with no production impact and often no available fix yet.
