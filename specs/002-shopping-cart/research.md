# Phase 0: Research (Shopping Cart)

## Unknowns / Clarifications
- Session management pattern for Spring Boot + PostgreSQL for cart persistence
- React cart state management: context vs. Redux vs. other
- API contract for cart endpoints (OpenAPI best practices)
- Product info integration (from Product Catalog service)
- Security for session-based carts (no login)
- Cart state persistence: session vs. local storage fallback

## Technology Best Practices
- Spring Boot RESTful API design for session-based resources
- PostgreSQL schema for cart and cart items
- React context for feature state (cart)
- TDD for backend (JUnit) and frontend (Jest/RTL)
- Integration and contract testing (Spring MockMvc, Cypress)
- Observability: logging, error handling, health checks
- Security: OWASP Top 10 for session-based carts

## Integration Patterns
- Service-to-service API calls (Product Catalog)
- Frontend-backend contract (OpenAPI, DTOs)

## Decisions & Rationale
- [To be filled after research]

## Alternatives Considered
- [To be filled after research]
