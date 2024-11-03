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
            className="md:p-4  bg-white rounded px-2 md:px-32 mt-20"
            initial={{ opacity: 0, y: 20 }}  // Start off invisible and below
            animate={{ opacity: 1, y: 0 }}    // Fade in and move to original position
            exit={{ opacity: 0, y: 20 }}       // Fade out and move below again
            transition={{ duration: 2, delay: 1 }} // Staggered entrance
        >
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-3xl md:text-5xl font-bold text-customBlue2">Featured Categories</h1>
                <p className="text-center">
                Explore our curated selection of top products, <br />combining quality and innovation to elevate your everyday experience. <br />Find your new favorites today!
                </p>
            </div>
            <div className="flex flex-col">
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="flex min-h-screen justify-center items-center text-lg font-semibold text-red-500"><CgDanger size={30} />{error}</p>
            ) : (
                <>
                    <FeaturedCard products={bestSellers} title="Best Sellers" error="No products found." link="/bestsellers" pic="/assets/bestsellers.png" />
                    <FeaturedCard products={newArrivals} title="New Arrivals" error="No new arrival products found." link="newarrivals" pic="/assets/newarrivals.png" />
                    <FeaturedCard products={exclusiveOffers} title="Exclusive Offers" error="No exclusive products found." link="exclusiveoffers" pic="/assets/exclusiveoffers.png" />
                    <FeaturedCard products={essentials} title="Essentials" error="No products found." link="essentials" pic="/assets/essentials.png" />
                </>
            )}
            </div>
        </motion.section>
        </AnimatePresence>
    );
};

export default FeaturedCategories;
