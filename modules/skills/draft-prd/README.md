# Draft PRD

## Purpose

Transform a problem statement into a structured Product Requirements Document.

## Input

- **problem**: string — The problem to solve
- **context**: object (optional) — stakeholders, constraints, prior art

## Output

Structured PRD with: Problem, Goals, Scope, Success Metrics, Non-goals, Timeline.

## Process

1. Clarify the problem from input; avoid solution bias
2. Derive measurable goals and success metrics
3. Define in-scope and out-of-scope (non-goals)
4. Output in standard PRD format per [prd-template](../../templates/prd-template/README.md)

## Constraints

- Do not invent features not implied by the problem
- Non-goals must be explicit
- Success metrics must be measurable

## Examples

**Input**: problem = "Users cannot recover lost wallet keys"

**Output**: PRD with Problem (key recovery pain), Goals (recovery flow), Scope (recovery methods in/out), Metrics (recovery rate, support tickets), Non-goals (hardware wallet support in v1).

## Related

- [prd-template](../../templates/prd-template/README.md)
- [create-prd](../../commands/create-prd/README.md)
- [product-thinking principle](../../../principles/product-thinking.md)
