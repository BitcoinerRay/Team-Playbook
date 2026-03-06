# Onboarding

## How to Consume

1. **New project**: Copy `playbook.example.yaml` to your project root as `playbook.yaml`. Set `playbook.preset` to match your project type (e.g. `web3-product`, `ai-agent-product`). Add include/exclude/overrides as needed.
   ```bash
   cp path/to/Team-Playbook/playbook.example.yaml ./playbook.yaml
   # Edit: playbook.preset: web3-product (or ai-agent-product)
   pnpm playbook sync
   ```
2. **AI / Cursor**: `pnpm playbook sync` generates `.playbook/modules` + `.cursor/rules` + `.cursor/skills` for direct consumption.
3. **Manual**: Browse `modules/` and `presets/`. Copy or reference content as needed.

## How to Contribute

1. Read [CONTRIBUTING.md](../../CONTRIBUTING.md).
2. Pick a module type (rule, skill, command, template) and follow its spec in `standards/`.
3. Create a branch, add your module with `meta.yaml` + `README.md`, run `pnpm validate`, open a PR.
