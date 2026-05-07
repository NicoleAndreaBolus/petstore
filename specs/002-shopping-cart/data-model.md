# Data Model: Shopping Cart

## Entities

### Cart
- id: UUID (session-based)
- items: List<CartItem>
- createdAt: timestamp
- updatedAt: timestamp

### CartItem
- id: UUID
- cartId: UUID (FK)
- productId: UUID (FK)
- quantity: integer
- price: decimal (copied from Product at add time)

### Product (reference)
- id: UUID
- name: string
- price: decimal
- ... (other fields from Product Catalog)

## Relationships
- Cart 1---* CartItem
- CartItem *---1 Product (via productId)

## Validation Rules
- quantity >= 1
- productId must exist in Product Catalog
- price must match Product at add time

## State Transitions
- Cart created on first add
- CartItem added/updated/removed
- Cart deleted on checkout or session end
