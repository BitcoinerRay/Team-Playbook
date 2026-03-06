# Review Checklist

Use when reviewing PRs that add or modify modules.

## Metadata

- [ ] `meta.yaml` exists and is valid
- [ ] `id` matches directory name exactly (enforced by `pnpm validate`) and is kebab-case
- [ ] `type` is one of: rule, skill, command, template
- [ ] `version`, `owner`, `status`, `summary`, `tags`, `updated_at` are present
- [ ] `applies_to` and `dependencies` are set (can be empty arrays)

## Content

- [ ] `README.md` exists and follows the spec for the module type
- [ ] Required sections per spec are present (e.g. required/recommended/anti-patterns for rules)
- [ ] No placeholder or TODO content left in final form
- [ ] Examples are concrete and correct

## Preset References

- [ ] If preset is modified, all referenced modules exist
- [ ] Required vs optional distinction is correct

## Validation

- [ ] `pnpm validate` passes
- [ ] No broken internal links
