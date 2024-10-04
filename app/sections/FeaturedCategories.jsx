"use client";
import BestSellers from "@/components/BestSellers";
import Essentials from "@/components/Essentials";
import ExclusiveOffer from "@/components/ExclusiveOffer";
import NewArrivals from "@/components/NewArrivals";
import useProductStore from "../store/productStore";
import { useEffect } from "react";
import Loading from "@/components/Loading";

const FeaturedCategories = () => {
    const { setNewArrivals, error, setError, loading, setLoading, setBestSellers, setExclusiveOffers, setEssentials } = useProductStore();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const result = await fetch(`https://dummyjson.com/products?limit=0`);
                const data = await result.json();

                const startDate = new Date("2024-05-23");
                const currentDate = new Date();

                // Filter products based on createdAt date
                const filteredProducts = data.products.filter(product => {
                    const createdAt = new Date(product.meta.createdAt);
                    return createdAt >= startDate && createdAt <= currentDate;
                });

                const bestSellers = data.products.filter(product => product.rating >= 4.50);
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
        <section id="featured" className="md:p-4 mt-20 md:mt-10">
            <div className="flex flex-col items-center gap-4 py-6">
                <h1 className="text-3xl font-bold text-customBlue">Featured Categories</h1>
            </div>
            <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <BestSellers />
                    <NewArrivals />
                    <ExclusiveOffer />
                    <Essentials />
                </>
            )}
            </div>
        </section>
    );
};

export default FeaturedCategories;
