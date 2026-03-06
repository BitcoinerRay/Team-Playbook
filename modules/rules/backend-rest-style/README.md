# Backend REST Style

## Purpose

Conventions for REST API design: resource naming, HTTP verbs, and status codes.

## Applies To

Backend services exposing REST APIs.

## Required

- Resources: plural nouns, kebab-case (e.g. `/users`, `/order-items`)
- GET: read, no side effects
- POST: create
- PUT/PATCH: update (PUT full replace, PATCH partial)
- DELETE: remove
- Use standard HTTP status codes (200, 201, 400, 401, 403, 404, 500)

## Recommended

- Version in URL or header: `/v1/users` or `Accept: application/vnd.api+json;version=1`
- Pagination: `?page=1&limit=20` or cursor-based
- Filtering: `?status=active&sort=-created_at`

## Anti-patterns

- Verbs in URLs (`/getUsers`, `/createOrder`)
- Mixed casing (`/UserProfiles`)
- Returning 200 for errors
- Nested resources beyond 2 levels (`/users/123/orders/456/items` — prefer `/order-items?orderId=456`)

## Examples

```
GET    /v1/users?status=active
POST   /v1/users
GET    /v1/users/:id
PATCH  /v1/users/:id
DELETE /v1/users/:id
```

## Related

- [naming spec](../../../standards/naming.md)
- [architecture-template](../../templates/architecture-template/README.md)
