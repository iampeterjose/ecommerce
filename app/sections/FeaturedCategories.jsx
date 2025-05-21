"use client";
import useProductStore from "../store/productStore";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { CgDanger } from "react-icons/cg";
import FeaturedCard from "@/components/FeaturedCard";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import useCustomHooks from "../useCustomHooks";

const FeaturedCategories = () => {
    const { useFeaturedCategories } = useCustomHooks
    useFeaturedCategories();
    const { error, loading, bestSellers, newArrivals, exclusiveOffers, essentials } = useProductStore();
    

    return (
        <AnimatePresence>
        <motion.section id="featured" 
            className="w-full bg-emerald-50 rounded-2xl px-2 md:px-32 py-12 mt-20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.3 }}
        >
            <div className="flex flex-col items-center gap-4 mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-700 mb-2 text-center">Featured Categories</h1>
                <p className="text-center text-emerald-600 md:text-lg max-w-2xl">
                    Explore our curated selection of top products, <br />combining quality and innovation to elevate your everyday experience. <br />Find your new favorites today!
                </p>
            </div>
            <div className="flex flex-col">
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="flex min-h-[200px] justify-center items-center text-lg font-semibold text-red-500"><CgDanger size={30} className="mr-2" />{error}</p>
            ) : (
                <>
                    <FeaturedCard products={bestSellers} title="Best Sellers" error="No products found." link="/products/bestsellers" pic="/assets/bestsellers.png" />
                    <FeaturedCard products={newArrivals} title="New Arrivals" error="No new arrival products found." link="/products/newarrivals" pic="/assets/newarrivals.png" />
                    <FeaturedCard products={exclusiveOffers} title="Exclusive Offers" error="No exclusive products found." link="/products/exclusiveoffers" pic="/assets/exclusiveoffers.png" />
                    <FeaturedCard products={essentials} title="Essentials" error="No products found." link="/products/essentials" pic="/assets/essentials.png" />
                </>
            )}
            </div>
        </motion.section>
        </AnimatePresence>
    );
};

export default FeaturedCategories;
