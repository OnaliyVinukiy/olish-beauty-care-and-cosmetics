"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-2 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/olish-logo.png"
            alt="Olish Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="ml-2 text-xl font-semibold text-gray-800">
            OLISH
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Icons and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-pink-500 transition-colors hidden md:block">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
          <Link
            href="/cart"
            prefetch={false}
            className="relative text-gray-600 hover:text-pink-500 transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-gray-600 hover:text-pink-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/90 backdrop-blur-md py-4 shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="text-gray-700 hover:text-pink-500 transition-colors flex items-center space-x-2">
              <MagnifyingGlassIcon className="w-6 h-6" />
              <span>Search</span>
            </button>
            <Link
              href="/cart"
              prefetch={false}
              className="relative text-gray-600 hover:text-pink-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;