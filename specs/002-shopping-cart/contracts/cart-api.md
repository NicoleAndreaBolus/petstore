# Shopping Cart API Contract (OpenAPI Sketch)

## Endpoints

### POST /api/cart/items
- Add product to cart
- Request: { productId: UUID, quantity: int }
- Response: Cart (full)

### PATCH /api/cart/items/{itemId}
- Update quantity
- Request: { quantity: int }
- Response: Cart (full)

### DELETE /api/cart/items/{itemId}
- Remove item
- Response: Cart (full)

### GET /api/cart
- Get current cart
- Response: Cart (full)

## Notes
- All endpoints are session-based (session cookie or header)
- 401 if session expired
- 404 if item not found
- 400 for validation errors
