"use client";

import {
  ShoppingCartIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const Page = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();

  const shippingCost = 200;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-gray-700 hover:text-pink-500"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 pb-12">
        {cartCount === 0 ? (
          <div className="text-center py-12">
            <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              href="/"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg text-pink-500 font-semibold">
                  {cartCount} {cartCount === 1 ? "Item" : "Items"} in Cart
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
              </div>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start pb-6 border-b border-gray-200"
                  >
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-gray-600 mt-1">
                        Rs.{item.price.toFixed(2)}
                      </p>
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-500 text-gray-500 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="mx-4 text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-500 text-gray-500 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <p className="mt-2 text-right text-pink-500 font-medium">
                        Rs.{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      Rs.{cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      Rs.{shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">
                      Rs.{(cartTotal + shippingCost).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
