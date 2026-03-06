# Contributing

## Prerequisites

- Node.js 18+
- pnpm or npm
- Run `npm install` (or `pnpm install`) before validate/build-registry

## Flow

1. Open an issue (optional): [new-module](.github/ISSUE_TEMPLATE/new-module.md) or [improve-module](.github/ISSUE_TEMPLATE/improve-module.md).
2. Create a branch: `feature/<id>-<description>` or `fix/<id>-<description>`.
3. Add or modify content per specs.
4. Run `pnpm validate` (or `npm run validate`).
5. Open a PR. Use the [PR template](.github/pull_request_template.md).

## Adding a Module

### Steps

1. Choose type: `rule`, `skill`, `command`, or `template`.
2. Read the spec: `standards/<type>-spec.md`.
3. Create directory: `modules/<type>/<id>/`.
4. Add `meta.yaml` with required fields.
5. Add `README.md` with required sections per spec.
6. For templates: add `template.md` or `template.yaml`.
7. Run `pnpm validate`.

### Naming

- Module ID: kebab-case, 2–4 words (e.g. `api-rate-limiting`).
- No underscores, spaces, or capitals.

### Metadata

Each module must have `meta.yaml` with:

- `id`, `name`, `type`, `version`, `owner`, `status`, `summary`
- `tags`, `applies_to`, `dependencies`, `updated_at`

`id` must match the directory name (e.g. `modules/rules/git-branching` requires `id: git-branching`). See [standards/rule-spec.md](standards/rule-spec.md) for full example.

### Presets

Presets live in `presets/<id>/` with `preset.yaml` and `README.md`. Use `extends: preset-base` (or another preset) to inherit required/optional modules. Only one level of inheritance is allowed. Run `pnpm validate` to check preset refs and extends.

### Review

Reviewers use [standards/review-checklist.md](standards/review-checklist.md). Ensure:

- meta.yaml valid and complete
- README follows spec
- `pnpm validate` passes

## When to Add vs Not Add

**Add** when:

- Reusable across projects
- Clear scope and format
- Team will reference it repeatedly

**Do not add** when:

- Project-specific only
- One-off or experimental
- Better as inline project docs

## After a Retro

1. Identify recurring patterns or decisions.
2. Propose as rule, skill, or template.
3. Open issue, then PR with module.
4. Link to retro notes in PR for context.
