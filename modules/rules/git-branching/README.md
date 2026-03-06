# Git Branching

## Purpose

Standardize branch naming and PR workflow for consistent collaboration.

## Applies To

All projects using Git.

## Required

- Branch names: `feature/<id>-<description>` or `fix/<id>-<description>` (e.g. `feature/123-add-login`)
- All changes merged via PR to `main` (or `develop` if using git-flow)
- PR title references ticket/issue ID when applicable

## Recommended

- Squash commits before merge
- Keep PRs under 400 lines of diff
- Delete branch after merge

## Anti-patterns

- Direct commits to main
- Pushing without opening PR
- Generic branch names (`fix`, `update`, `changes`)

## Examples

```
feature/456-wallet-connect
fix/789-null-check-api
chore/101-update-deps
```

## Related

- [monorepo-base](../monorepo-base/README.md)
- [review-checklist](../../../standards/review-checklist.md)
