"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRightIcon,
  HeartIcon,
  StarIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

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
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-2 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
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
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              Products
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* Icons and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-pink-500 transition-colors hidden md:block">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-pink-500 transition-colors hidden md:block">
              <ShoppingCartIcon className="w-6 h-6" />
            </button>
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
              <a
                href="#"
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-pink-500 transition-colors font-medium text-lg"
              >
                Contact
              </a>
              <button className="text-gray-700 hover:text-pink-500 transition-colors flex items-center space-x-2">
                <MagnifyingGlassIcon className="w-6 h-6" />
                <span>Search</span>
              </button>
              <button className="text-gray-700 hover:text-pink-500 transition-colors flex items-center space-x-2">
                <ShoppingCartIcon className="w-6 h-6" />
                <span>Cart</span>
              </button>
            </div>
          </motion.div>
        )}
      </nav>

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
                    <button className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
