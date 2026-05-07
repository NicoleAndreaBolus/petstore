---
description: "Task list for Shopping Cart feature implementation"
---

# Tasks: Shopping Cart

**Input**: Design documents from `/specs/002-shopping-cart/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup

- [ ] T001 Initialize backend cart module in backend/cart/
- [ ] T002 Initialize frontend cart feature in frontend/src/features/cart/
- [ ] T003 [P] Install backend dependencies (Spring Boot, PostgreSQL driver) in backend/build.gradle or pom.xml
- [ ] T004 [P] Install frontend dependencies (React, MUI, Tailwind) in frontend/package.json
- [ ] T005 Configure PostgreSQL database for cart service (dev/staging) in backend/config/
- [ ] T006 [P] Setup test frameworks: JUnit (backend), Jest/RTL (frontend), Cypress (e2e)

## Phase 2: Foundational

- [ ] T007 Define Cart, CartItem entities and relationships in backend/cart/model/
- [ ] T008 Implement Cart repository (Spring Data JPA) in backend/cart/repository/
- [ ] T009 [P] Implement Product service integration (API client) in backend/cart/service/
- [ ] T010 [P] Define cart API DTOs in backend/cart/dto/
- [ ] T011 [P] Setup CartContext and types in frontend/src/features/cart/context/
- [ ] T012 [P] Draft OpenAPI spec for cart endpoints in backend/cart/openapi/
- [ ] T013 [P] Implement validation rules (quantity, product existence, price) in backend/cart/service/

## Phase 3: User Story 1 - Add Item to Cart (P1)

- [ ] T014 [US1] Implement POST /api/cart/items endpoint in backend/cart/controller/CartController.java
- [ ] T015 [US1] Implement add-to-cart logic in backend/cart/service/CartService.java
- [ ] T016 [P] [US1] Implement AddToCartButton component in frontend/src/features/cart/AddToCartButton.tsx
- [ ] T017 [P] [US1] Integrate AddToCartButton with CartContext and backend API in frontend/src/features/cart/
- [ ] T018 [US1] Write JUnit tests for add-to-cart logic in backend/cart/service/CartServiceTest.java
- [ ] T019 [P] [US1] Write Jest/RTL tests for AddToCartButton in frontend/src/features/cart/__tests__/
- [ ] T020 [US1] Integration test: Add item to cart (Spring MockMvc) in backend/cart/
- [ ] T021 [P] [US1] e2e test: Add item to cart (Cypress) in frontend/tests/e2e/

## Phase 4: User Story 2 - Update Item Quantity (P2)

- [ ] T022 [US2] Implement PATCH /api/cart/items/{itemId} endpoint in backend/cart/controller/CartController.java
- [ ] T023 [US2] Implement update quantity logic in backend/cart/service/CartService.java
- [ ] T024 [P] [US2] Implement quantity update controls in CartItem component in frontend/src/features/cart/CartItem.tsx
- [ ] T025 [P] [US2] Integrate quantity update with CartContext and backend API in frontend/src/features/cart/
- [ ] T026 [US2] Write JUnit tests for update quantity logic in backend/cart/service/CartServiceTest.java
- [ ] T027 [P] [US2] Write Jest/RTL tests for CartItem quantity update in frontend/src/features/cart/__tests__/
- [ ] T028 [US2] Integration test: Update item quantity (Spring MockMvc) in backend/cart/
- [ ] T029 [P] [US2] e2e test: Update item quantity (Cypress) in frontend/tests/e2e/

## Phase 5: User Story 3 - Remove Item from Cart (P3)

- [ ] T030 [US3] Implement DELETE /api/cart/items/{itemId} endpoint in backend/cart/controller/CartController.java
- [ ] T031 [US3] Implement remove item logic in backend/cart/service/CartService.java
- [ ] T032 [P] [US3] Implement remove button in CartItem component in frontend/src/features/cart/CartItem.tsx
- [ ] T033 [P] [US3] Integrate remove action with CartContext and backend API in frontend/src/features/cart/
- [ ] T034 [US3] Write JUnit tests for remove item logic in backend/cart/service/CartServiceTest.java
- [ ] T035 [P] [US3] Write Jest/RTL tests for CartItem remove in frontend/src/features/cart/__tests__/
- [ ] T036 [US3] Integration test: Remove item from cart (Spring MockMvc) in backend/cart/
- [ ] T037 [P] [US3] e2e test: Remove item from cart (Cypress) in frontend/tests/e2e/

## Phase 6: User Story 4 - View Cart Summary (P4)

- [ ] T038 [US4] Implement GET /api/cart endpoint in backend/cart/controller/CartController.java
- [ ] T039 [US4] Implement cart summary logic in backend/cart/service/CartService.java
- [ ] T040 [P] [US4] Implement CartSummary component in frontend/src/features/cart/CartSummary.tsx
- [ ] T041 [P] [US4] Integrate CartSummary with CartContext and backend API in frontend/src/features/cart/
- [ ] T042 [US4] Write JUnit tests for cart summary logic in backend/cart/service/CartServiceTest.java
- [ ] T043 [P] [US4] Write Jest/RTL tests for CartSummary in frontend/src/features/cart/__tests__/
- [ ] T044 [US4] Integration test: View cart summary (Spring MockMvc) in backend/cart/
- [ ] T045 [P] [US4] e2e test: View cart summary (Cypress) in frontend/tests/e2e/

## Final Phase: Polish & Cross-Cutting

- [ ] T046 Add logging, error handling, and health checks in backend/cart/
- [ ] T047 Ensure GDPR/CCPA compliance and security best practices in backend/cart/ and frontend/src/features/cart/
- [ ] T048 Update OpenAPI spec and architecture docs in backend/cart/openapi/ and docs/
- [ ] T049 Peer review and PRs for all code changes
- [ ] T050 CI/CD: Run all tests and static analysis before merge
- [ ] T051 Deploy to Render (staging/prod) with managed PostgreSQL

## Dependencies

- US1 → US2, US3, US4 (Add must exist before update/remove/view)
- US2, US3, US4 can proceed in parallel after US1

## Parallel Execution Examples

- T003, T004, T006 can run in parallel
- All [P] tasks within a phase can run in parallel
- US2, US3, US4 phases can be implemented/tested in parallel after US1

## Implementation Strategy

- MVP: Complete all US1 tasks (Add to Cart)
- Incrementally deliver US2, US3, US4 as independent, testable increments

---

*All tasks follow the strict checklist format. Each user story phase is independently testable. Parallelization is maximized where possible.*
