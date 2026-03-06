# Web3 Product Preset

## Use Case

Web3/crypto product projects: wallets, DeFi, NFTs, or similar. Often involve sensitive keys, env management, and product launch cycles.

## Why This Combination

- **monorepo-base, git-branching, env-management**: Web3 projects typically need clean structure, consistent workflow, and careful secret handling (keys, RPC URLs).
- **draft-prd, prd-template**: Product-first; scope before build. PRD helps align team on problem and goals.
- **Optional**: architecture-review for complex systems; launch-copywriting for user-facing launches; backend/frontend rules when applicable.

## Effective Modules

- **Required (always)**: monorepo-base, git-branching, env-management, draft-prd, prd-template
- **Optional (add via overrides)**: backend-rest-style, frontend-structure, architecture-review, launch-copywriting, create-prd, generate-architecture-note, review-feature-scope, architecture-template, launch-plan-template

## How to Consume

1. Add `playbook.yaml` to your project root.
2. Set `preset: web3-product`.
3. Add overrides as needed (e.g. add `backend-rest-style` if building API).

```yaml
preset: web3-product
overrides:
  rules:
    add: [backend-rest-style]
```
