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
- CI runs a dependency audit (`yarn audit --level high`) on every push and pull request (non-blocking — see note below).

## Known limitations

- The `yarn audit` step in CI is currently non-blocking (`continue-on-error: true`). Failing the build on every `high`/`critical` advisory would currently break CI on transitive dev-only dependencies (test tooling) that have no production impact and no available fix. Treat the audit output as a signal to review, not a hard gate, until the dependency tree is cleaned up enough to flip it to blocking.
