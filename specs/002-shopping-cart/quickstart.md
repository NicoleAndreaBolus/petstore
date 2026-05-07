# Shopping Cart Quickstart

## Backend
1. Ensure Java 21+, Spring Boot, and PostgreSQL are installed/configured.
2. Create `cart` module/service in backend.
3. Implement REST endpoints for cart (see contracts/cart-api.md).
4. Write JUnit tests for all service logic (TDD).
5. Integrate with Product Catalog service for product info.
6. Add logging, error handling, and health checks.

## Frontend
1. Ensure React, Tailwind, and MUI are installed.
2. Create `src/features/cart/` for cart components and context.
3. Implement CartSummary, CartItem, AddToCartButton, CartContext (see contracts/cart-ui.md).
4. Write Jest/RTL tests for all components (TDD).
5. Integrate with backend API for all cart actions.

## Testing & Deployment
1. Write integration and e2e tests (Spring MockMvc, Cypress).
2. Run all tests and static analysis before PR/merge.
3. Deploy to Render (staging/prod) with managed PostgreSQL.

## Docs
- Update README, architecture docs, and OpenAPI spec as needed.
