# Review Feature Scope

## Purpose

Validate a feature scope document against a checklist and produce feedback.

## Intent

Ensure scope document is complete and ready for implementation.

## Inputs

- **scope_doc**: string or path — Scope document to review

## Steps

1. Load scope document
2. Check against [feature-scoping](../../skills/feature-scoping/README.md) output structure:
   - Acceptance criteria present and testable
   - Edge cases listed
   - Out of scope explicit
   - Open questions captured
3. Produce feedback: missing items, unclear criteria, blockers

## Outputs

- Review feedback (list of issues and recommendations)

## Examples

```bash
# Manual: reviewer reads scope doc and checks each section
# Use feature-scoping skill as reference for expected structure
```

```yaml
# AI/Agent prompt
Review the scope document at docs/scope/export-csv.md against the feature-scoping skill.
Output: list of missing items, unclear criteria, and recommendations.
```

## Related

- [feature-scoping](../../skills/feature-scoping/README.md)
- [review-checklist](../../../standards/review-checklist.md)
