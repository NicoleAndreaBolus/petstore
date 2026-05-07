package com.bolus.petstore.cart;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin // Allow React frontend to make requests here
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // --- DTO Classes for JSON payloads ---

    public static class AddItemPayload {
        private Long productId;
        private int quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    public static class QuantityUpdatePayload {
        private int quantity;

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    // --- Endpoints ---

    @PostMapping("/items")
    public ResponseEntity<Cart> addItem(
            @RequestParam String sessionId, 
            @RequestBody AddItemPayload payload) {
        
        // Safely extract values using the DTO (no manual parsing needed!)
        Long productId = payload.getProductId();
        int quantity = payload.getQuantity();
        
        Cart cart = cartService.addItem(sessionId, productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @PatchMapping("/items/{itemId}")
    public ResponseEntity<Cart> updateItemQuantity(
            @RequestParam String sessionId, 
            @PathVariable Long itemId, 
            @RequestBody QuantityUpdatePayload payload) {
        
        // Safely extract the new quantity using the DTO
        int quantity = payload.getQuantity();
        
        Cart cart = cartService.updateItemQuantity(sessionId, itemId, quantity);
        return cart != null ? ResponseEntity.ok(cart) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Cart> removeItem(
            @RequestParam String sessionId, 
            @PathVariable Long itemId) {
            
        Cart cart = cartService.removeItem(sessionId, itemId);
        return cart != null ? ResponseEntity.ok(cart) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<Cart> viewCart(@RequestParam String sessionId) {
        Cart cart = cartService.viewCart(sessionId);
        
        // If a cart doesn't exist yet for the session, returning an empty cart is 
        // usually better than 404 so the frontend doesn't crash.
        if (cart == null) {
            cart = new Cart();
            cart.setSessionId(sessionId);
            cart.setItems(new java.util.ArrayList<>());
            return ResponseEntity.ok(cart);
        }
        
        return ResponseEntity.ok(cart);
    }
}