# Feature Specification: Wishlist

**Feature Branch**: `[008-wishlist]`  
**Created**: April 30, 2026  
**Status**: Draft  
**Input**: User description: "Wishlist: Save favorite products for later."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add Product to Wishlist (Priority: P1)

As a logged-in user, I want to save a product to my wishlist so I can find it easily later.

**Why this priority**: Enables users to bookmark products for future purchase, increasing engagement and sales.

**Independent Test**: Add a product to the wishlist and verify it appears in the wishlist view.

**Acceptance Scenarios**:

1. **Given** a product page, **When** a logged-in user clicks "Add to Wishlist", **Then** the product is saved to their wishlist.
2. **Given** a product already in the wishlist, **When** the user tries to add it again, **Then** a message indicates it is already saved.

---

### User Story 2 - View Wishlist (Priority: P2)

As a user, I want to view my wishlist so I can see all my saved products in one place.

**Why this priority**: Improves user experience and encourages return visits.

**Independent Test**: Open the wishlist and verify all saved products are displayed.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they open their wishlist, **Then** all saved products are listed.

---

### User Story 3 - Remove Product from Wishlist (Priority: P3)

As a user, I want to remove products from my wishlist so I can manage my saved items.

**Why this priority**: Gives users control over their wishlist and keeps it relevant.

**Independent Test**: Remove a product from the wishlist and verify it no longer appears.

**Acceptance Scenarios**:

1. **Given** a product in the wishlist, **When** the user clicks "Remove", **Then** the product is deleted from the wishlist.

## Functional Requirements

1. Logged-in users can add products to their wishlist.
2. Users can view all products in their wishlist.
3. Users can remove products from their wishlist.
4. Duplicate products are not allowed in the wishlist.
5. Wishlist is persistent across sessions for logged-in users.

## Success Criteria

- 100% of logged-in users can add, view, and remove wishlist items without errors.
- Wishlist state persists across sessions.
- Duplicate products are prevented in the wishlist.

## Key Entities

- User
- Product
- Wishlist
- WishlistItem

## Assumptions

- Wishlist is only available to logged-in users.
