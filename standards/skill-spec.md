# Skill Specification

## Purpose

Skills are reusable capabilities for AI or humans. They describe process, not just format.

## Required Sections

- **input**: What the skill receives (format, required fields)
- **output**: What the skill produces
- **process**: Steps or logic to apply
- **constraints**: Limits, assumptions, edge cases

## meta.yaml Fields

Same as [rule-spec](./rule-spec.md). `type: skill`. `id` must match directory name.

## README Structure

- Purpose
- Input
- Output
- Process
- Constraints
- Examples
- Related

## Example

```markdown
## Input
- problem: string (the problem statement)
- context: object (optional: stakeholders, constraints)

## Output
Structured PRD with: Problem, Goals, Scope, Success Metrics, Non-goals

## Process
1. Clarify problem from input
2. Derive goals and success metrics
3. Define scope and non-goals
4. Output in standard PRD format

## Constraints
- Do not invent features not implied by problem
- Non-goals must be explicit
```
