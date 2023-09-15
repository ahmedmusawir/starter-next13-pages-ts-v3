import { products } from "@/demo-data/data";
import { createContext, ReactNode, useContext } from "react";

interface ProductContextProps {
  products: typeof products;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
