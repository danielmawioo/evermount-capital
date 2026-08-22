# Contributing

## Setup

```bash
yarn install
cp .env.example .env.local   # fill in the values you need — see README.md
yarn dev
```

## Before opening a PR

```bash
yarn lint          # next lint --max-warnings=0 in CI
yarn format:check  # prettier --check .; run `yarn format` to fix
yarn typecheck     # tsc --noEmit
yarn test          # jest --coverage; CI enforces a coverage floor (jest.config.js)
yarn build         # confirms the production build still compiles
```

All five run in CI (`.github/workflows/deploy.yml`) on every push and pull request to `main`; the Vercel deploy only fires after they pass on `main`, and never fires from a pull request.

## Commit and PR conventions

- **One logical change per commit.** A commit (or a small PR) should contain one feature, fix, or refactor, together with the tests that pin its behavior. Don't bundle formatting, unrelated refactors, and new features into one commit — it makes the history impossible to review or bisect.
- **Ship tests with the code that needs them**, not as a follow-up. If you add a new hook, page, or utility with real logic, add a colocated `*.test.ts`/`*.test.tsx` in the same PR.
- **Write a commit message that explains why**, not just what — the diff already shows what changed.
- **Use [Conventional Commits](https://www.conventionalcommits.org/)** for the subject line: `feat: add withdrawal amount validation`, `fix: correct KES minimum on M-Pesa deposits`, `test: cover useAdminUsers error paths`, `chore: ...`, `docs: ...`, `refactor: ...`, `style: ...`. This is enforced by a `commit-msg` git hook (`commitlint`, configured in `commitlint.config.js`) installed automatically via `yarn install` (husky's `prepare` script) — a non-conforming commit message will be rejected locally before it ever reaches CI.
- **Add a line to [`CHANGELOG.md`](./CHANGELOG.md)'s `Unreleased` section** for any user-facing change (feature, fix, breaking change), in the same commit as the change itself.

## Project structure

```
src/
  app/            Next.js App Router: pages, layouts, API routes
    components/   Shared UI used across public pages (Navbar, ChatWidget, charts, ...)
    dashboard/    Authenticated investor/manager/admin dashboards
  components/     Shared components used by both public and dashboard code (gates, uploads)
  context/        React context providers (theme)
  hooks/          Data-fetching/state hooks extracted from pages (useTradingOps, useAdminUsers, ...)
  lib/
    api/          One file per backend domain (auth, wallets, admin, ...), composed by api-client.ts
    api-client.ts Public entry point: `import { api } from "@/lib/api-client"`
    auth-storage.ts, api-error.ts, schemas.ts  Shared utilities
```

When a page or hook grows past ~400-500 lines, that's a signal to extract: data/state logic into a `src/hooks/use*.ts` hook (see `useTradingOps.ts`, `useManagerClients.ts`, `useAdminUsers.ts` for the pattern), and/or JSX into presentational subcomponents under a local `components/` directory next to the page.

## Testing conventions

- Tests are colocated with the code they cover (`Component.tsx` → `Component.test.tsx`).
- Mock the API layer with `axios-mock-adapter` against the shared `apiClient` (see `src/lib/api/client.test.ts` or any dashboard page test for the pattern) — don't mock `fetch` directly except for the two Next.js Route Handlers (`src/app/api/*/route.ts`), which need Node's real `Request`/`Response` via a `@jest-environment node` docblock.
- `jest.setup.ts` globally stubs `matchMedia`, `ResizeObserver`, `IntersectionObserver`, `navigator.clipboard`, and canvas (for chart components) — you shouldn't need to mock those yourself.
- Prefer testing real behavior (form submission → correct endpoint/payload, error states, conditional rendering) over snapshot tests. A plain smoke test (renders without crashing, key heading present) is fine for pages that are mostly static content.
