# Frontend Structure

## Purpose

Conventions for frontend project structure: feature folders, component hierarchy, and state placement.

## Applies To

Frontend applications (React, Vue, or similar).

## Required

- Feature-based folders: group by feature/domain, not by type (e.g. `features/auth/`, `features/dashboard/`)
- Each feature: components, hooks, utils, types colocated
- Shared: `components/`, `hooks/`, `utils/` at root for cross-feature use

## Recommended

- Component hierarchy: page → layout → feature → ui primitives
- State: local first, lift only when shared; avoid global state for single-feature data
- Barrel exports: `index.ts` for public API of each feature

## Anti-patterns

- Type-based folders only (`components/`, `hooks/` with no feature grouping)
- Deep nesting (>4 levels)
- Global state for everything
- Circular imports between features

## Examples

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.ts
│   └── dashboard/
├── components/   # shared
├── hooks/
└── utils/
```

## Related

- [backend-rest-style](../backend-rest-style/README.md)
- [architecture-template](../../templates/architecture-template/README.md)
