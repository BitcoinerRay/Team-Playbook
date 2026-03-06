# Markdown Format Standards

## Headers

- Use ATX style (`#`, `##`, `###`)
- One H1 per file (title)
- No skipped levels (H1 → H2 → H3)

## Lists

- Use `-` for unordered lists
- Use `1.` for ordered lists
- Indent nested lists with 2 spaces

## Code Blocks

- Use fenced code blocks with language tag: ` ```typescript `
- For YAML, use ` ```yaml `

## YAML Frontmatter

Optional for modules. If used:

```yaml
---
id: my-module
type: rule
---
```

## Links

- Prefer relative links for internal references: `[rule-spec](./rule-spec.md)`
- Use full paths for cross-directory: `[monorepo-base](../modules/rules/monorepo-base/README.md)`
