import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();

  const {
    removeFromCart,
    setIsCartOpen,
    isCartOpen,
    setCartItems,
    cartDetails,
    subtotal,
  } = useCart();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    // Find the cart item and update its quantity
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (id: number) => {
    removeFromCart(id);
    // setIsCartOpen(true);

    // Check if the cart is empty after removal
    if (cartDetails.length === 1) {
      // Since we're checking before the state update, 1 means it's the last item
      router.push("/shop"); // Redirect to the shop page
    }
  };

  const goBackToShop = () => {
    router.push("/shop"); // Redirect to the shop page
    setIsCartOpen(false);
  };

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsCartOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartDetails.length === 0 && (
                              <h3 className="mt-12">
                                The Shopping Cart is empty!
                              </h3>
                            )}
                            {cartDetails?.map((cartItem) => {
                              return (
                                <li key={cartItem.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={cartItem?.productDetails?.imageSrc}
                                      alt={cartItem?.productDetails?.imageAlt}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          {cartItem?.productDetails?.name}
                                        </h3>
                                        <p className="ml-4">
                                          {cartItem?.productDetails?.price}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center sm:text-center">
                                        <label
                                          htmlFor={`quantity-${cartItem.id}`}
                                          className="text-gray-500 mr-2 font-bold"
                                        >
                                          Qty
                                        </label>
                                        <select
                                          id={`quantity-${cartItem.id}`}
                                          name={`quantity-${cartItem.id}`}
                                          value={cartItem.quantity} // set the default value to the cart item's quantity
                                          onChange={(e) =>
                                            handleQuantityChange(
                                              cartItem.id,
                                              parseInt(e.target.value)
                                            )
                                          }
                                          className="block max-w-full rounded-md border border-gray-300 py-1.5 px-3 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                        >
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                          <option value={7}>7</option>
                                          <option value={8}>8</option>
                                        </select>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleRemoveCartItem(cartItem.id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div
                        className="mt-6"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <Link
                          href={cartDetails.length > 0 ? "/checkout" : "#"}
                          className={`flex items-center justify-center rounded-md px-6 py-3 text-base font-medium shadow-sm ${
                            cartDetails.length > 0
                              ? "bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent"
                              : "bg-gray-300 text-gray-500 border border-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => goBackToShop()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
