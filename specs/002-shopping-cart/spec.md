# Feature Specification: Shopping Cart

**Feature Branch**: `[002-shopping-cart]`  
**Created**: April 30, 2026  
**Status**: Draft  
**Input**: User description: "Shopping Cart: Add, update, and remove items; view cart summary and total."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Item to Cart (Priority: P1)

As a shopper, I want to add a product to my cart from the product page so that I can purchase it later.

**Why this priority**: This is the core action for enabling purchases and is essential for any e-commerce flow.

**Independent Test**: Add a product to the cart and verify it appears in the cart summary with correct details.

**Acceptance Scenarios**:

1. **Given** a product page, **When** the user clicks "Add to Cart", **Then** the product is added to the cart and visible in the cart summary.
2. **Given** a product already in the cart, **When** the user adds it again, **Then** the quantity increases appropriately.

---

### User Story 2 - Update Item Quantity (Priority: P2)

As a shopper, I want to change the quantity of items in my cart so that I can adjust my order before checkout.

**Why this priority**: Allows users to modify their order, improving flexibility and user experience.

**Independent Test**: Change the quantity of an item in the cart and verify the total updates accordingly.

**Acceptance Scenarios**:

1. **Given** an item in the cart, **When** the user increases or decreases the quantity, **Then** the cart updates the quantity and recalculates the total.
2. **Given** the quantity is set to zero, **When** the user confirms, **Then** the item is removed from the cart.

---

### User Story 3 - Remove Item from Cart (Priority: P3)

As a shopper, I want to remove items from my cart so that I can change my mind before purchasing.

**Why this priority**: Supports user control and prevents accidental purchases.

**Independent Test**: Remove an item from the cart and verify it no longer appears in the cart summary.

**Acceptance Scenarios**:

1. **Given** an item in the cart, **When** the user clicks "Remove", **Then** the item is deleted from the cart and the total updates.

---

### User Story 4 - View Cart Summary (Priority: P4)

As a shopper, I want to view a summary of my cart so that I can review my order before checkout.

**Why this priority**: Ensures transparency and trust before purchase.

**Independent Test**: View the cart and verify all items, quantities, prices, and totals are correct.

**Acceptance Scenarios**:

1. **Given** items in the cart, **When** the user opens the cart, **Then** all items, quantities, prices, and the total are displayed accurately.

## Functional Requirements

1. Users can add products to the cart from product listings or detail pages.
2. Users can update the quantity of each item in the cart.
3. Users can remove items from the cart.
4. The cart displays a summary including all items, quantities, prices, and the total cost.
5. Cart state persists during the session (until checkout or logout).

## Success Criteria

- 100% of users can add, update, and remove items from the cart without errors.
- Cart summary always reflects the current state of the cart.
- Cart state persists for the duration of the session.
- Users can independently test each cart action.

## Clarifications

### Session 2026-04-30
- Q: For the Java backend, what package should be used for Shopping Cart domain classes? → A: All Shopping Cart domain classes must use the package `com.bolus.petstore`.

## Implementation Constraints

- All Java Shopping Cart classes (e.g., Cart, CartItem, CartService) must be placed under the package `com.bolus.petstore`.

## Key Entities

- Cart
- CartItem
- Product

## Assumptions

- Cart is session-based and does not require user login.
- Product availability is checked when adding to cart.
