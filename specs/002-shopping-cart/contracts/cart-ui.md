# Shopping Cart UI Contract

## Components
- CartSummary: shows all items, quantities, prices, total
- CartItem: single item row with update/remove controls
- AddToCartButton: on product pages
- CartContext: React context for cart state

## UI States
- Empty cart
- Cart with items
- Loading/error states

## API Integration
- All cart actions call backend API
- Cart state updates on API response

## Validation
- Disable update/remove if API pending
- Show errors inline
