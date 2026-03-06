# Registry

Machine-readable index for Team Playbook consumption.

## Files

- `index.json` — Full registry: modules, presets, manifest (`schema_version`, `built_at`)
- `search-index.json` — Slim index for tag/summary search
- `schema/` — JSON Schemas for validation

## Consumption Contract

### schema_version

Registry format version. Consumers should check `schema_version` before parsing. Current: `1`.

### Playbook Resolution

1. Load `registry/index.json` and `playbook.yaml`
2. Resolve preset: `required` + `optional` (or `extends` if preset inherits)
3. Apply overrides: `add` to required/optional, `remove` from result
4. Resolve dependencies: include each module's `dependencies` in final list
5. Output: `playbook-manifest` format (see `schema/playbook-manifest.json`)

### Sync

`pnpm playbook sync` reads `playbook.yaml`, resolves preset/include/exclude/dependencies, then writes:

- `.playbook/registry.json`
- `.playbook/modules/{rules,skills,commands,templates}`
- `docs/playbook/manifest.json`
- `.cursor/rules` and `.cursor/skills`
