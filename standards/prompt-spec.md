# Prompt Specification

Standard structure for prompts intended for AI consumption.

## Structure

1. **Context**: What the AI needs to know (role, domain, constraints)
2. **Task**: What to produce (output format, scope)
3. **Input**: Explicit inputs (parameters, examples)
4. **Output**: Expected format (structure, schema, examples)
5. **Constraints**: What NOT to do, limits, format rules

## Example

```markdown
## Context
You are a product architect. Output must be in English.

## Task
Draft a PRD section for "Scope" given a problem statement.

## Input
- problem: string (the problem to solve)
- stakeholders: string[] (optional)

## Output
Markdown with sections: In Scope, Out of Scope, Assumptions.

## Constraints
- Do not invent features not implied by the problem
- Maximum 500 words
```

## Reference

See `standards/rule-spec.md`, `standards/skill-spec.md` for module-specific prompt patterns.
