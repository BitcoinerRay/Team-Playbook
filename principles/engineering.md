# Engineering Principles

## Minimal Change Scope

Change only what is necessary. Avoid refactoring unrelated code, global lint fixes, or style changes. Each change should have a clear, bounded purpose.

## Zero-Assumption Policy

Do not invent or guess missing information. If requirements are ambiguous, data is absent, or multiple valid paths exist, ask before implementing. Placeholders and hallucinated values create technical debt.

## Decision Escalation

When a requirement is ambiguous, controversial, or has multiple valid implementations, escalate to the decision owner. Do not make arbitrary design or implementation choices.

## Surgical Modification

Prefer small, targeted edits over large rewrites. Preserve existing behavior unless explicitly changing it. Document the specific logic changed in commits.
