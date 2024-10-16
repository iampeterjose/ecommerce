"use client";
import BestSellers from "@/components/BestSellers";
import Essentials from "@/components/Essentials";
import ExclusiveOffer from "@/components/ExclusiveOffer";
import NewArrivals from "@/components/NewArrivals";
import useProductStore from "../store/productStore";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { CgDanger } from "react-icons/cg";
import FeaturedCard from "@/components/FeaturedCard";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const FeaturedCategories = () => {
    const { setNewArrivals, isOpen, error, setError, loading, setLoading, setBestSellers, setExclusiveOffers, setEssentials, bestSellers, newArrivals, exclusiveOffers, essentials } = useProductStore();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const result = await fetch(`https://dummyjson.com/products?limit=28`);
                const data = await result.json();

                const startDate = new Date("2024-05-23");
                const currentDate = new Date();

                // Filter products based on createdAt date
                const filteredProducts = data.products.filter(product => {
                    const createdAt = new Date(product.meta.createdAt);
                    return createdAt >= startDate && createdAt <= currentDate;
                });

                const bestSellers = data.products.filter(product => product.rating >= 4);
                const exclusiveOffers = data.products.filter(product => product.discountPercentage >= 18);
                const essentials = data.products.filter(product => product.category ==="groceries");

                setNewArrivals(filteredProducts);
                setBestSellers(bestSellers);
                setExclusiveOffers(exclusiveOffers);
                setEssentials(essentials);
            } catch (error) {
                console.error(`Error connecting to server:`, error);
                setError('Failed to load content');
            } finally {
                setLoading(false);  
            }
        };

        fetchAllProducts();
    }, [setNewArrivals, setError, setLoading, setBestSellers, setExclusiveOffers, setEssentials]);

    return (
        <AnimatePresence>
        <motion.section id="featured" 
            className="md:p-4  bg-white rounded"
            initial={{ opacity: 0, y: 20 }}  // Start off invisible and below
            animate={{ opacity: 1, y: 0 }}    // Fade in and move to original position
            exit={{ opacity: 0, y: 20 }}       // Fade out and move below again
            transition={{ duration: 2, delay: 1 }} // Staggered entrance
        >
            <div className="flex flex-col -mt-40 md:mt-0 items-center gap-4">
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
                    <FeaturedCard products={bestSellers} isOpen={isOpen} title="Best Sellers" error="No products found." link="/bestsellers" pic="/assets/bestsellers.png" />
                    <FeaturedCard products={newArrivals} isOpen={isOpen} title="New Arrivals" error="No new arrival products found." link="newarrivals" pic="/assets/newarrivals.png" />
                    <FeaturedCard products={exclusiveOffers} isOpen={isOpen} title="Exclusive Offers" error="No exclusive products found." link="exclusiveoffers" pic="/assets/exclusiveoffers.png" />
                    <FeaturedCard products={essentials} isOpen={isOpen} title="Essentials" error="No products found." link="essentials" pic="/assets/essentials.png" />
                </>
            )}
            </div>
        </motion.section>
        </AnimatePresence>
    );
};

export default FeaturedCategories;
