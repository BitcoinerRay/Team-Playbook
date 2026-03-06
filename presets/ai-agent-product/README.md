# AI Agent Product Preset

## Use Case

AI/Agent product projects: LLM apps, agent workflows, AI-powered features. Require clear scope (agent boundaries) and prompt discipline.

## Why This Combination

- **monorepo-base, git-branching**: Standard structure and workflow.
- **draft-prd, feature-scoping**: AI products need tight scope; agent boundaries and edge cases must be explicit. feature-scoping helps define what the agent does and does not do.
- **Optional**: architecture-review for system design; env-management for API keys; create-prd, review-feature-scope for process.

**Note**: For prompt quality, also reference `standards/prompt-spec.md`. For AI collaboration principles, see `principles/ai-collaboration.md`. These are standards/principles, not modules, so they are not in the preset—but recommended reading.

## Effective Modules

- **Required**: monorepo-base, git-branching, draft-prd, feature-scoping, prd-template
- **Optional**: env-management, frontend-structure, architecture-review, create-prd, review-feature-scope, generate-architecture-note, architecture-template

## How to Consume

1. Add `playbook.yaml` to your project root.
2. Set `preset: ai-agent-product`.
3. Add overrides as needed.

```yaml
preset: ai-agent-product
overrides:
  skills:
    add: [launch-copywriting]
```
