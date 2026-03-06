# Naming Standards

## Module ID Format

- Use **kebab-case**: `feature-scoping`, `backend-rest-style`, `prd-template`
- No underscores, no spaces, no capitals
- Length: 2–4 words, descriptive but concise

## Preset Names

- Same pattern: `web3-product`, `ai-agent-product`
- Suffix with domain or project type when helpful
- `id` in preset.yaml must match directory name (enforced by validate)

## Tag Conventions

- Use lowercase, hyphen-separated: `prd`, `api`, `frontend`, `web3`
- Avoid generic tags like `misc` or `other`
- Prefer existing tags from `registry/index.json` when applicable

## File Naming

- `meta.yaml`: Required for all modules
- `README.md`: Required for all modules
- `template.md` or `template.yaml`: For templates
- `examples/`: Optional directory for examples
