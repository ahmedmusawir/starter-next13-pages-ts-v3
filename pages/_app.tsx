import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { store } from "@/store/store";
import { ThemeProvider } from "@/theme/ThemeProvider";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider>
          <ProductProvider>
            <CartProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </CartProvider>
          </ProductProvider>
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}
