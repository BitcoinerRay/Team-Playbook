# Create PRD

## Purpose

Scaffold a new PRD document from a problem statement using the PRD template.

## Prerequisites

Team-Playbook must be available. Options: (a) git submodule, (b) clone alongside project, (c) run `sync-preset` to copy templates into project. Paths in Steps are relative to playbook repo root.

## Intent

Create a structured PRD file with initial sections filled from inputs.

## Inputs

- **project_name**: string (required) — Name of project or feature
- **problem**: string (required) — Problem statement to solve

## Steps

1. Copy `<playbook-root>/modules/templates/prd-template/template.md` to `docs/prd/<project_name>.md`
2. Fill Problem section with `problem`
3. Fill Project/Feature name with `project_name`
4. Leave remaining sections with placeholder guidance for author to complete

## Outputs

- `docs/prd/<project_name>.md` with initial structure

## Examples

```bash
# Manual workflow
# 1. Create docs/prd/ if not exists
# 2. Copy template
cp modules/templates/prd-template/template.md docs/prd/wallet-recovery.md
# 3. Edit: set Problem = "Users cannot recover lost wallet keys"
# 4. Edit: set Project = "Wallet Recovery"
```

```yaml
# AI/Agent prompt
Create a PRD for project_name="Wallet Recovery" and problem="Users cannot recover lost wallet keys".
Use the prd-template from Team-Playbook. Output to docs/prd/wallet-recovery.md.
```

## Related

- [prd-template](../../templates/prd-template/README.md)
- [draft-prd](../../skills/draft-prd/README.md)
