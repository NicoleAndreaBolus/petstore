package com.bolus.petstore.cart;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findBySessionId(String sessionId);
}
