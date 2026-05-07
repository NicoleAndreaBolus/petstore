# Feature Specification: Reviews & Ratings

**Feature Branch**: `[007-reviews-ratings]`  
**Created**: April 30, 2026  
**Status**: Draft  
**Input**: User description: "Reviews & Ratings: Users can leave reviews and ratings for products."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Review & Rating (Priority: P1)

As a logged-in user, I want to leave a review and rating for a product so I can share my experience with others.

**Why this priority**: User-generated reviews build trust and influence purchasing decisions.

**Independent Test**: Submit a review and rating for a product and verify it appears publicly.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they submit a review and rating, **Then** it is displayed on the product page.
2. **Given** a user who has already reviewed a product, **When** they try to submit another review, **Then** they are prompted to edit or update their existing review.

---

### User Story 2 - View Reviews & Ratings (Priority: P2)

As a shopper, I want to read reviews and see ratings for products so I can make informed purchase decisions.

**Why this priority**: Increases transparency and helps users choose products.

**Independent Test**: View a product page and verify reviews and ratings are visible and accurate.

**Acceptance Scenarios**:

1. **Given** a product page, **When** reviews exist, **Then** all reviews and average ratings are displayed.
2. **Given** no reviews, **When** a user views the product, **Then** a message indicates no reviews are available.

## Functional Requirements

1. Logged-in users can submit one review and rating per product.
2. Users can edit or update their own reviews.
3. All users can view reviews and average ratings for each product.
4. Reviews are moderated for inappropriate content.

## Success Criteria

- 100% of logged-in users can submit, edit, or update reviews for products they purchased.
- All users can view reviews and ratings for every product.
- Reviews are displayed in a timely and accurate manner.
- Inappropriate content is not visible to users.

## Key Entities

- User
- Product
- Review
- Rating

## Assumptions

- Only users who purchased a product can leave a review.
- Reviews are subject to moderation before publication.
