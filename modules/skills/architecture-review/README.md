# Architecture Review

## Purpose

Review design documents for tradeoffs, risks, and alternatives before implementation.

## Input

- **design_doc**: string or path — Architecture or design document
- **context**: object (optional) — constraints, timeline, team size

## Output

Review notes with: Tradeoffs Identified, Risks, Alternatives Considered, Recommendations, Blockers.

## Process

1. Read design doc and extract key decisions
2. For each decision: identify tradeoffs and alternatives
3. List risks (technical, operational, timeline)
4. Recommend go/no-go or changes
5. Call out blockers that must be resolved

## Constraints

- Be constructive; suggest alternatives, not only criticism
- Prioritize risks by impact and likelihood
- Distinguish must-fix from nice-to-have

## Examples

**Input**: design_doc = architecture note for new payment service

**Output**: Tradeoffs (sync vs async, single vs multi-tenant), Risks (vendor lock-in, latency), Alternatives (build vs buy), Recommendation (proceed with async, add vendor abstraction), Blockers (compliance sign-off).

## Related

- [architecture-template](../../templates/architecture-template/README.md)
- [generate-architecture-note](../../commands/generate-architecture-note/README.md)
- [project-classification principle](../../../principles/project-classification.md)
