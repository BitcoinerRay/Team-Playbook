# Template Specification

## Purpose

Templates are reusable document or file structures. They reduce friction and ensure consistency.

## Required Sections

- **usage**: When and how to use the template
- **structure**: Section or field breakdown
- **placeholders**: What to replace (e.g. `{{PROJECT_NAME}}`, `{{DATE}}`)
- **example**: At least one filled example or snippet

## meta.yaml Fields

Same as [rule-spec](./rule-spec.md). `type: template`. `id` must match directory name.

## File Layout

- `template.md` or `template.yaml`: The actual template
- `README.md`: Usage, structure, placeholders, example
- `meta.yaml`: Metadata

## Placeholder Convention

- Use `{{PLACEHOLDER}}` for required replacements
- Use `<!-- optional section -->` for optional blocks in markdown
- Document all placeholders in README

## Example

```markdown
## Usage
Copy template.md to your project. Replace placeholders before use.

## Structure
1. Problem
2. Goals
3. Scope
4. Success Metrics
5. Non-goals
6. Timeline

## Placeholders
- {{PROJECT_NAME}}: Project or feature name
- {{DATE}}: YYYY-MM-DD
- {{OWNER}}: Document owner
```
