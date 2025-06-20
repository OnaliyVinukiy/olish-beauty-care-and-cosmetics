"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

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
    const fetchData = async () => {
      setIsLoading(true);

      const productCategories: ProductCategory[] = [
        {
          id: 1,
          name: "Face Serums",
          description: "Powerful formulations for radiant skin",
          image: "/images/face-serum.jpg",
          slug: "face-serums",
        },
        {
          id: 2,
          name: "Face Creams",
          description: "Nourish and protect your skin",
          image: "/images/face-cream.jpg",
          slug: "face-creams",
        },
        {
          id: 3,
          name: "Body Lotions",
          description: "Silky hydration for your body",
          image: "/images/body-lotion.jpg",
          slug: "body-lotions",
        },
        {
          id: 4,
          name: "Soaps",
          description: "Gentle cleansing for all skin types",
          image: "/images/soap.jpg",
          slug: "soaps",
        },
      ];

      const products: Product[] = [
        {
          id: 1,
          name: "Glow Renewal Serum",
          price: 49.99,
          category: "face-serums",
          image: "/products/serum-1.jpg",
          isBestSeller: true,
        },
        {
          id: 2,
          name: "Hydra Plus Face Cream",
          price: 39.99,
          category: "face-creams",
          image: "/products/cream-1.jpg",
          isBestSeller: true,
        },
        {
          id: 3,
          name: "Silk Body Lotion",
          price: 29.99,
          category: "body-lotions",
          image: "/products/lotion-1.jpg",
          isBestSeller: false,
        },
        {
          id: 4,
          name: "Botanical Cleansing Soap",
          price: 12.99,
          category: "soaps",
          image: "/products/soap-1.jpg",
          isBestSeller: true,
        },
      ];

      setCategories(productCategories);
      setFeaturedProducts(products);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Radiant Skin Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our premium collection of beauty care products crafted
              with natural ingredients for your skin's health and glow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-medium flex items-center justify-center transition-all">
                Shop Now <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
              <button className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-full font-medium text-black flex items-center justify-center transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={categoriesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated beauty care products designed for
              all skin types.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-gray-200">{category.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
