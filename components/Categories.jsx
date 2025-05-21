"use client";

import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Categories = () => {
    const { categories, setCategories, setError } = useProductStore();
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetch('https://dummyjson.com/products/categories');
                const data = await result.json();
                setCategories(data);
            } catch (error) {
                console.log(`Error connecting to server: `, error);
                setError("Failed to load products.");
            }
        };

        fetchCategories();
    }, [setCategories, setError]);

    // Auto-scroll logic
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        let scrollAmount = 0;
        const cardWidth = 100; // px, approximate width of a card including gap
        const scrollStep = cardWidth * 2; // scroll by 2 cards at a time
        const interval = setInterval(() => {
            if (!container) return;
            // If at end, reset to start
            if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 5) {
                container.scrollTo({ left: 0, behavior: 'smooth' });
                scrollAmount = 0;
            } else {
                scrollAmount += scrollStep;
                container.scrollBy({ left: scrollStep, behavior: 'smooth' });
            }
        }, 2500);
        return () => clearInterval(interval);
    }, [categories]);

    return (
        <section className="w-full px-1 md:px-32 mt-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 tracking-tight mb-6 md:mb-8 text-center drop-shadow">Shop by Category</h1>
            <div className="w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-100 rounded-2xl md:rounded-3xl shadow-xl py-5 md:py-8 px-1 md:px-10">
                <div ref={scrollRef} className="flex gap-2 md:gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-emerald-50 py-1 md:py-2">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center w-[90px] md:w-[150px] bg-white/80 border-2 border-emerald-100 rounded-xl md:rounded-2xl shadow-lg hover:shadow-emerald-200 transition-all duration-200 p-3 md:p-6 group cursor-pointer hover:-translate-y-1 hover:bg-emerald-50/80"
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link href={`products/category/${category.slug}`} className="flex flex-col items-center gap-2 md:gap-3 w-full h-full">
                                <span className="flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-emerald-100 group-hover:bg-emerald-200 shadow-inner mb-1 md:mb-2">
                                    <svg className="w-5 h-5 md:w-8 md:h-8 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                                </span>
                                <span className="text-xs md:text-lg font-bold text-emerald-700 capitalize group-hover:text-emerald-800 transition-colors text-center drop-shadow-sm">{category.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
