# Sample Project B

Example project using the **ai-agent-product** preset with overrides.

## How to Use

Copy `playbook.yaml` to your project root. Preset resolution depends on your tooling (sync-preset, Cursor, etc.).

## Description

An AI/Agent product (e.g. LLM app or agent workflow). Uses the ai-agent-product preset and adds env-management (for API keys), launch-copywriting, create-prd, review-feature-scope, and launch-plan-template.

## Playbook

See `playbook.yaml`. Inherits from ai-agent-product and adds:

- **rules**: env-management
- **skills**: launch-copywriting
- **commands**: create-prd, review-feature-scope
- **templates**: launch-plan-template
