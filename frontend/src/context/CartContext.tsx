import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Pet {
  id: number;
  name: string;
  species: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  id: number; 
  productId: number; 
  quantity: number;
  // Added optional fields for the UI to display
  name?: string; 
  imageUrl?: string;
  species?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (pet: Pet) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getSessionId = () => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID(); 
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const sessionId = getSessionId();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart?sessionId=${sessionId}`);
      if (response.ok) {
        const cart = await response.json();
        if (cart.items && cart.items.length > 0) {
           // FETCH PET DETAILS TO GET PHOTOS AND NAMES!
           const petsRes = await fetch("http://localhost:8080/api/pets");
           if (petsRes.ok) {
               const allPets = await petsRes.json();
               // Merge the cart items with the pet details
               const enrichedItems = cart.items.map((item: any) => {
                   const pet = allPets.find((p: any) => p.id === item.productId);
                   return {
                       ...item,
                       name: pet?.name || "Unknown Pet",
                       imageUrl: pet?.imageUrl || "",
                       species: pet?.species || "Unknown"
                   };
               });
               setCartItems(enrichedItems);
           } else {
               setCartItems(cart.items);
           }
        } else {
           setCartItems([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const addToCart = async (pet: Pet) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/items?sessionId=${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: pet.id, quantity: 1 }),
      });
      if (response.ok) fetchCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
      try {
          const response = await fetch(`http://localhost:8080/api/cart/items/${itemId}?sessionId=${sessionId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ quantity })
          });
          if (response.ok) fetchCart();
      } catch (error) {
          console.error("Failed to update quantity:", error);
      }
  }

  const removeFromCart = async (itemId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/cart/items/${itemId}?sessionId=${sessionId}`, {
            method: 'DELETE'
        });
        if (response.ok) fetchCart();
    } catch (error) {
        console.error("Failed to remove item:", error);
    }
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (100 * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
};