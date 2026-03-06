# PRD Template

## Purpose

Standard structure for Product Requirements Documents.

## Usage

Copy `template.md` to your project (e.g. `docs/prd/<project>.md`). Replace placeholders and fill sections.

## Structure

1. Problem
2. Goals
3. Scope (In / Out)
4. Success Metrics
5. Assumptions
6. Timeline

## Placeholders

- `{{PROJECT_NAME}}`: Project or feature name
- `{{OWNER}}`: Document owner
- `{{DATE}}`: YYYY-MM-DD

## Example

```markdown
# Wallet Recovery - Product Requirements Document

**Owner**: Jane
**Date**: 2025-03-06
**Status**: Draft

## Problem
Users who lose device access cannot recover their wallet. Key loss leads to permanent fund loss.

## Goals
1. Enable recovery without centralized custody
2. Reduce support tickets for "lost keys" by 50%
...
```

## Related

- [draft-prd](../../skills/draft-prd/README.md)
- [create-prd](../../commands/create-prd/README.md)
