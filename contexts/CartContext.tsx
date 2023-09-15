import { products } from "@/demo-data/data";
import Cart from "@/components/ui-ux/Cart";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumbs: {
    id: number;
    name: string;
  }[];
}

interface CartItem {
  id: number;
  quantity: number;
}

interface CartDetail {
  id: number;
  quantity: number;
  productDetails: Product;
}

interface CartContextProps {
  cartItems: CartItem[];
  cartDetails: CartDetail[];
  subtotal: number;
  isCartOpen: boolean;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getItemQuantity: (itemId: number) => number;
  increaseCartQuantity: (itemId: number) => void;
  decreaseCartQuantity: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
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

  // Option 1: throwing an error if product is undefined
  const cartDetails = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) throw new Error(`Product with id ${cartItem.id} not found`);
    return {
      ...cartItem,
      productDetails: product,
    };
  });

  //Option 2: just filtering out the null value from the array and then used type assertion
  // const cartDetails = cartItems
  //   .map((cartItem) => {
  //     const product = products.find((p) => p.id === cartItem.id);
  //     if (!product) return null;
  //     return {
  //       ...cartItem,
  //       productDetails: product,
  //     };
  //   })
  //   .filter((item) => item !== null) as CartDetail[];

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return acc;
      return (
        acc + parseFloat(product.price.replace("$", "")) * cartItem.quantity
      );
    }, 0);
  }, [cartItems, products]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartDetails,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        setCartItems,
        subtotal,
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
