import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Row } from "../ui-ux";
import { Page } from "../globals";
import { useProducts } from "@/contexts/ProductContext";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const ShopContent = () => {
  const { products } = useProducts();
  const { increaseCartQuantity, setIsCartOpen, removeFromCart, cartItems } =
    useCart();

  const isProductInCart = (productId: number) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = (id: number) => {
    increaseCartQuantity(id);
    setIsCartOpen(true);
  };
  const handleRemoveCartItem = (id: number) => {
    removeFromCart(id);
    setIsCartOpen(true);
  };

  return (
    <>
      <Head>
        <title>Next Page ShopContent</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <Row className="prose max-w-3xl mx-auto">
          <h1 className="text-center">The Shop</h1>
        </Row>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-1">
            <div className="md:flex md:items-center md:justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Trending products
              </h2>
              <a
                href="#"
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
              >
                Ask a question...
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative my-5">
                  <Link href={`/shop/${product.id}`}>
                    <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </Link>
                  <section className="">
                    <h3 className="mt-4 text-sm text-gray-700">
                      {/* <span className="absolute inset-0" /> THIS MAKES THE WHOLE DIV CLICKABLE ... TROUBLE! */}
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {product.price}
                    </p>

                    {!isProductInCart(product.id) && (
                      <button
                        type="button"
                        className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right xl:mb-10"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Add To Cart
                      </button>
                    )}
                    {isProductInCart(product.id) && (
                      <button
                        type="button"
                        className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right"
                        onClick={() => handleRemoveCartItem(product.id)}
                      >
                        Remove Item
                      </button>
                    )}
                  </section>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default ShopContent;
