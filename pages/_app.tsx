import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { store } from "@/store/store";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
