# Feature Scoping

## Purpose

Define acceptance criteria and edge cases for a feature before implementation.

## Input

- **feature**: string — Feature idea or name
- **context**: object (optional) — PRD reference, user stories, constraints

## Output

Scope document with: Acceptance Criteria, Edge Cases, In/Out of Scope, Open Questions.

## Process

1. Break feature into user-facing outcomes
2. Write acceptance criteria (Given/When/Then or checklist)
3. List edge cases and error states
4. Explicitly exclude out-of-scope items
5. Capture open questions for stakeholders

## Constraints

- Criteria must be testable
- Edge cases must include failure modes
- Do not scope implementation details unless necessary

## Examples

**Input**: feature = "Export transactions to CSV"

**Output**: Criteria (user selects date range, clicks export, receives file), Edge cases (empty range, large export, cancelled), Out of scope (scheduled exports), Open (max rows limit?).

## Related

- [draft-prd](../draft-prd/README.md)
- [review-feature-scope](../../commands/review-feature-scope/README.md)
- [product-thinking principle](../../../principles/product-thinking.md)
