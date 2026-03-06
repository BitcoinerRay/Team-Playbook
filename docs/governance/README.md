# Governance

## Ownership

- Each module has an `owner` in meta.yaml. Owner is responsible for updates and deprecation.
- Principles and standards are owned by the team; changes require broader review.

## Lifecycle

- **active**: Default. Module is maintained and recommended.
- **deprecated**: No longer recommended. Will be removed in a future version. Migration path documented.
- **archived**: Historical only. Not listed in presets.

## Deprecation

1. Set `status: deprecated` in meta.yaml.
2. Add deprecation note to README with migration path.
3. Remove from presets or mark as optional with warning.
4. After grace period, archive or remove.
