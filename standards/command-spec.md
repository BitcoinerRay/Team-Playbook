# Command Specification

## Purpose

Commands are executable workflows. They describe steps a human or agent can follow.

## Required Sections

- **intent**: One-line description of what the command achieves
- **inputs**: Required and optional parameters
- **steps**: Ordered list of actions
- **outputs**: What is produced
- **examples**: At least one concrete example

## meta.yaml Fields

Same as [rule-spec](./rule-spec.md). `type: command`. `id` must match directory name.

## README Structure

- Purpose
- Intent
- Inputs
- Steps
- Outputs
- Examples
- Related

## Example

```markdown
## Intent
Scaffold a new PRD from a problem statement.

## Inputs
- project_name: string (required)
- problem: string (required)

## Steps
1. Copy `modules/templates/prd-template/template.md` to `docs/prd/<project_name>.md`
2. Fill Problem section with `problem`
3. Fill remaining sections per template instructions

## Outputs
- `docs/prd/<project_name>.md` with initial structure

## Examples
```bash
# Manual: create-prd project_name="Wallet" problem="Users cannot recover lost keys"
```
```
