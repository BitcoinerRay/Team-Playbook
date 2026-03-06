# Architecture Template

## Purpose

Standard structure for architecture and design documents.

## Usage

Copy `template.md` to your project (e.g. `docs/architecture/<system>.md`). Replace placeholders and fill sections.

## Structure

1. Context
2. Decisions
3. Components
4. Data Flow
5. Risks

## Placeholders

- `{{SYSTEM_NAME}}`: System or component name
- `{{OWNER}}`: Document owner
- `{{DATE}}`: YYYY-MM-DD
- `{{TITLE}}`: Decision title (repeat for each decision)

## Example

```markdown
# Payment Service - Architecture

## Context
Payment Service processes orders and integrates with payment providers.

## Decisions

### Decision 1: Async processing
- **What**: Use message queue for payment processing
- **Why**: Handle provider latency, retries, idempotency
- **Alternatives**: Sync (rejected: blocks request), cron (rejected: delay)
...
```

## Related

- [architecture-review](../../skills/architecture-review/README.md)
- [generate-architecture-note](../../commands/generate-architecture-note/README.md)
