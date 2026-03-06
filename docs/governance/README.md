# Governance

## Ownership

- Each module has an `owner` in meta.yaml. Owner is responsible for updates and deprecation.
- Principles and standards are owned by the team; changes require broader review.

## Lifecycle (status)

- **stable**: Recommended. Interface stable, changes follow semver.
- **experimental**: Usable but may change; no backward-compatibility guarantee.
- **deprecated**: No longer recommended. Migration path documented. Planned for removal.
- **archived**: Historical only. Not listed in presets.

## When to use each

- **stable**: Default for production-ready modules. Use after review and real usage.
- **experimental**: New modules, APIs under iteration, or breaking changes expected.
- **deprecated**: Owner sets when module is superseded or obsolete. Must document migration.
- **archived**: After deprecation grace period, or when module is retired.

## Deprecation

1. Set `status: deprecated` in meta.yaml.
2. Add deprecation note to README with migration path.
3. Remove from presets or mark as optional with warning.
4. After grace period, archive or remove.
