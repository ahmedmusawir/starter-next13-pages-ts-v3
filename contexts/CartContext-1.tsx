import Cart from "@/components/ui-ux/Cart";
import { createContext, ReactNode, useContext, useState } from "react";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  getItemQuantity: (itemId: number) => number;
  increaseCartQuantity: (itemId: number) => void;
  decreaseCartQuantity: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getItemQuantity = (itemId: number) => {
    return cartItems.find((item) => item.id === itemId)?.quantity || 0;
  };

  const increaseCartQuantity = (itemId: number) => {
    console.log("itemId:", itemId);
    setCartItems((currentItems) => {
      if (!currentItems.find((item) => item.id === itemId)) {
        return [...currentItems, { id: itemId, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (itemId: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === itemId)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== itemId);
      } else {
        return currentItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        setCartItems,
      }}
    >
      {children}
      <Cart />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
