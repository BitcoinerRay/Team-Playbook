# Rule Specification

## Purpose

Rules define constraints and conventions. They are enforced by humans and/or tooling.

## Required Sections

- **required**: Must-follow rules. Violations block merge or deployment.
- **recommended**: Should-follow. Violations are flagged but not blocking.
- **anti-patterns**: Explicitly forbidden. Include examples of what to avoid.

## meta.yaml Fields

```yaml
id: git-branching
name: Git Branching
type: rule
version: "1.0"
owner: team
status: active
summary: Branch naming and PR flow conventions
tags: [git, workflow]
applies_to: [all]
dependencies: []
updated_at: "2025-03-06"
```

## README Structure

- Purpose
- Applies To
- Required
- Recommended
- Anti-patterns
- Examples
- Related

## Validation

`pnpm validate` checks: meta.yaml exists, id matches directory name, required fields present, no duplicate ids.

## Example

```markdown
## Required
- Branch names: `feature/<id>-<description>` or `fix/<id>-<description>`
- All changes via PR to main

## Recommended
- Squash commits before merge
- Keep PRs under 400 lines

## Anti-patterns
- Direct commits to main
- Pushing without PR
```
