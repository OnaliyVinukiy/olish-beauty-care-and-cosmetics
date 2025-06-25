"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { useCart } from "./context/CartContext";

type ProductCategory = {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isBestSeller: boolean;
};

const Home = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const { addToCart } = useCart();

  // Animation hooks
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Function to check and set mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // Set initial mobile view on component mount
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobileView);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const productCategories: ProductCategory[] = [
        {
          id: 1,
          name: "Face Serums",
          description: "Powerful formulations for radiant skin",
          image: "/images/face-serum.jpg",
          slug: "Face-Serums",
        },
        {
          id: 2,
          name: "Face Creams",
          description: "Nourish and protect your skin",
          image: "/images/face-cream.jpg",
          slug: "Face-Creams",
        },
        {
          id: 3,
          name: "Body Lotions",
          description: "Silky hydration for your body",
          image: "/images/body-lotion.jpg",
          slug: "Body-Lotions",
        },
        {
          id: 4,
          name: "Soaps",
          description: "Gentle cleansing for all skin types",
          image: "/images/soap.png",
          slug: "Soaps",
        },
      ];

      const products: Product[] = [
        {
          id: 1,
          name: "Niacinamide Serum",
          price: 1390.0,
          category: "Face-Serums",
          image: "images/products/niacinamide-serum.png",
          isBestSeller: true,
        },
        {
          id: 2,
          name: "Natural Whitening Night Cream",
          price: 1990.0,
          category: "Face-Creams",
          image: "images/products/whitening-cream.png",
          isBestSeller: true,
        },
        {
          id: 3,
          name: "Alpha Arbutin Serum",
          price: 1390.0,
          category: "Face-Serums",
          image: "images/products/alpha-arbutin.png",
          isBestSeller: true,
        },

        {
          id: 4,
          name: "Niacinamide Face & Body Cream",
          price: 12.99,
          category: "Body-Lotions",
          image: "images/products/niacinamide-lotion.png",
          isBestSeller: true,
        },
      ];

      setCategories(productCategories);
      setFeaturedProducts(products);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Determine which hero image to use
  const heroImage = isMobileView
    ? "/images/mobile-banner.png"
    : "/images/hero.png";

  return (
    <div className="min-h-screen bg-white">

      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-pink-100 blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-amber-100 blur-3xl opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-44 overflow-hidden pt-32">
        {/* Dynamic hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            opacity: isMobileView ? 0.32 : 0.72,
          }}
        ></div>
        {isMobileView && (
          <div className="absolute inset-0 bg-gradient-to-b from-white-700/30 to-white-500/10"></div>
        )}
        <div className="container mx-auto px-4">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center relative z-10"
          >
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <img
                  src="/images/olish-logo.png"
                  alt="Olish Logo"
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              For a{" "}
              <span className="text-transparent bg-clip-text bg-cyan-600">
                Radiant Skin
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
              Discover our premium collection of beauty care products crafted
              with natural ingredients for your skin&#39;s health and glow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">Explore Products</span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 hover:opacity-100 transition-opacity -z-10 blur-md"></div>
              </motion.button>
              <button className="border-2 border-gray-900 hover:bg-gray-900/5 px-8 py-4 rounded-full font-medium text-black flex items-center justify-center transition-all">
                About Olish
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            ref={categoriesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="relative inline-block">
                Curated Collections
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></span>
              </span>
            </h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
              Indulge in premium skincare formulated with gentle, safe
              ingredients where elegance meets efficacy for truly radiant
              results.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-2xl h-96 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-xl transition-all relative"
                >
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10"></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {category.description}
                      </p>
                      <button className="mt-3 text-sm font-medium text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 transition-all flex items-center">
                        Explore <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              <span className="relative inline-block">
                Our Bestsellers
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"></span>
              </span>
            </h2>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
              Loved by thousands for their best results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative">
                  <div className="h-64 w-full bg-white relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />

                    {product.isBestSeller && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                        <StarIcon className="w-3 h-3 mr-1" />
                        Bestseller
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-black text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {product.category.replace("-", " ")}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">
                      Rs.{product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <img
                  src="/images/olish-logo.png"
                  alt="Olish Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="ml-2 text-xl font-semibold">OLISH</span>
              </div>
              <p className="text-gray-300">
                Premium skincare products crafted with natural ingredients for
                radiant and healthy skin.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-pink-500 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-pink-500 flex items-center justify-center transition-colors"
                  aria-label="Tiktok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-pink-500 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-500"></span>
              </h3>
              <ul className="space-y-3">
                {["Home", "Products", "Categories", "About", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-pink-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                Customer Service
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-500"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  "FAQs",
                  "Shipping Policy",
                  "Return Policy",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-pink-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                Newsletter
                <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-500"></span>
              </h3>
              <p className="text-gray-300 mb-4">
                Subscribe to get updates on new products and special offers.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Olish Beauty Care & Cosmetics Pvt
              Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
