# Environment Management

## Purpose

Conventions for environment variables, secrets, and per-stage configuration.

## Applies To

All projects with runtime configuration.

## Required

- `.env.example` committed with all required keys (values as placeholders)
- Secrets never committed; use env vars or secret manager
- `.env` in `.gitignore`

## Recommended

- Prefix env vars by domain: `API_`, `DB_`, `AUTH_`
- Document each var in `.env.example` with comment
- Separate configs per stage: dev, staging, prod

## Anti-patterns

- Committing `.env` with real values
- Hardcoding secrets
- Missing `.env.example` (new devs cannot bootstrap)
- Using same secrets across stages

## Examples

```bash
# .env.example
# Database connection
DB_URL=postgresql://localhost:5432/app
DB_POOL_SIZE=10

# API (do not commit real key)
API_KEY=your_api_key_here
```

## Related

- [git-branching](../git-branching/README.md)
- [backend-rest-style](../backend-rest-style/README.md)
