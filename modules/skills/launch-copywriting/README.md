# Launch Copywriting

## Purpose

Transform a feature list into value-first launch copy for users and stakeholders.

## Input

- **features**: string[] — List of features or changes
- **audience**: string (optional) — users, investors, internal
- **channel**: string (optional) — blog, email, in-app, tweet

## Output

Launch copy with: Headline, Value Proposition, Key Points, CTA.

## Process

1. Extract user value from each feature (benefit, not implementation)
2. Order by impact; lead with strongest value
3. Write headline that captures core value
4. Expand key points in audience-appropriate tone
5. Add clear call-to-action

## Constraints

- Value-first: "Save 2 hours/week" not "New export feature"
- Match tone to audience and channel
- Keep headline under 60 chars for social

## Examples

**Input**: features = ["CSV export", "Scheduled reports", "Team sharing"]

**Output**: Headline "Get insights without the manual work", Value "Export, schedule, and share—automatically", Key points (export on your schedule, share with team, no copy-paste), CTA "Try it free".

## Related

- [launch-plan-template](../../templates/launch-plan-template/README.md)
- [draft-prd](../draft-prd/README.md)
- [product-thinking principle](../../../principles/product-thinking.md)
