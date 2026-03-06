# Monorepo Base

## Purpose

Define workspace layout, package boundaries, and shared dependency conventions for monorepo projects.

## Applies To

Projects using pnpm workspaces, npm workspaces, or similar monorepo tooling.

## Required

- Root `package.json` with `workspaces` or `pnpm-workspace.yaml`
- Each package in its own directory under `packages/` or `apps/`
- Package names must be unique and scoped (e.g. `@org/package-name`)

## Recommended

- Shared config (tsconfig, eslint) in root or `packages/config`
- Internal packages use `workspace:*` for cross-references
- Clear boundary: apps depend on packages, packages do not depend on apps

## Anti-patterns

- Circular dependencies between packages
- Apps importing directly from other apps
- Unversioned or inconsistent internal package references

## Examples

```
repo/
├── packages/
│   ├── shared/
│   ├── api-client/
│   └── ui-kit/
├── apps/
│   ├── web/
│   └── api/
├── pnpm-workspace.yaml
└── package.json
```

## Related

- [git-branching](../git-branching/README.md)
- [naming spec](../../../standards/naming.md)
