## What & why

<!-- One or two sentences: what changed and why. The diff already shows what — explain the reasoning here. -->

## Checklist

- [ ] One logical change per commit; tests for new logic are in the **same commit**, not a follow-up (see [CONTRIBUTING.md](../CONTRIBUTING.md#commit-and-pr-conventions))
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `test:`, `refactor:`, `chore:`, `docs:`, `style:`) — enforced locally by commitlint and in CI on this PR
- [ ] `yarn lint && yarn format:check && yarn typecheck && yarn test && yarn build` all pass locally
- [ ] `CHANGELOG.md`'s `Unreleased` section is updated for any user-facing change
