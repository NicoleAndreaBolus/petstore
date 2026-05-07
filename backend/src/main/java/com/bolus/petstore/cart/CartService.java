package com.bolus.petstore.cart;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // 1. Add item to cart (Includes the NullPointer Fix)
    public Cart addItem(String sessionId, Long productId, int quantity) {
        Cart cart = cartRepository.findBySessionId(sessionId);
        
        if (cart == null) {
            cart = new Cart();
            cart.setSessionId(sessionId);
        }

        // Fix: Ensure the items list is initialized
        if (cart.getItems() == null) {
            cart.setItems(new java.util.ArrayList<>());
        }

        boolean found = false;
        
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                found = true;
                break;
            }
        }
        
        if (!found) {
            CartItem item = new CartItem();
            item.setProductId(productId);
            item.setQuantity(quantity);
            item.setCart(cart); 
            cart.getItems().add(item); 
        }
        
        return cartRepository.save(cart);
    }

    // 2. Update item quantity (This is the method Gradle couldn't find!)
    public Cart updateItemQuantity(String sessionId, Long itemId, int quantity) {
        Cart cart = cartRepository.findBySessionId(sessionId);
        if (cart == null) return null;
        
        if (cart.getItems() != null) {
            for (CartItem item : cart.getItems()) {
                if (item.getId().equals(itemId)) {
                    if (quantity > 0) {
                        item.setQuantity(quantity);
                    } else {
                        cart.getItems().remove(item);
                    }
                    break;
                }
            }
        }
        return cartRepository.save(cart);
    }

    // 3. Remove item from cart
    public Cart removeItem(String sessionId, Long itemId) {
        Cart cart = cartRepository.findBySessionId(sessionId);
        if (cart == null) return null;
        
        if (cart.getItems() != null) {
            cart.getItems().removeIf(item -> item.getId().equals(itemId));
        }
        return cartRepository.save(cart);
    }

    // 4. View cart
    public Cart viewCart(String sessionId) {
        return cartRepository.findBySessionId(sessionId);
    }
}