# Generate Architecture Note

## Purpose

Scaffold an architecture document from a system or component name.

## Prerequisites

Team-Playbook must be available (submodule, clone, or sync-preset). Paths are relative to playbook repo root.

## Intent

Create a structured architecture doc with initial sections for the author to fill.

## Inputs

- **system_name**: string (required) — Name of system or component
- **output_path**: string (optional) — Default: `docs/architecture/<system_name>.md`

## Steps

1. Copy `<playbook-root>/modules/templates/architecture-template/template.md` to `docs/architecture/<system_name>.md`
2. Fill Context section with system name and purpose
3. Leave Decisions, Components, Data Flow, Risks for author to complete

## Outputs

- `docs/architecture/<system_name>.md` with initial structure

## Examples

```bash
# Manual workflow
cp modules/templates/architecture-template/template.md docs/architecture/payment-service.md
# Edit: set Context = "Payment Service - processes payments for orders"
```

```yaml
# AI/Agent prompt
Generate an architecture note for system_name="Payment Service".
Use the architecture-template from Team-Playbook. Output to docs/architecture/payment-service.md.
```

## Related

- [architecture-template](../../templates/architecture-template/README.md)
- [architecture-review](../../skills/architecture-review/README.md)
