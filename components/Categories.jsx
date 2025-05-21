"use client";

import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Categories = () => {
    const { categories, setCategories, setError } = useProductStore();

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

    return (
        <section className="w-full px-2 md:px-32 mt-8">
            <h1 className="text-3xl mb-6 font-montserrat font-bold text-emerald-700 tracking-tight text-center md:text-left">Shop by Category</h1>
            <div className="w-full bg-emerald-50 rounded-xl shadow-inner py-6 px-2 md:px-8">
                <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-2">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center min-w-[120px] md:min-w-[160px] bg-white border border-emerald-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 p-4 group cursor-pointer"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Link href={`products/category/${category.slug}`} className="flex flex-col items-center gap-2 w-full h-full">
                                {/* Optionally add an icon or image for each category here */}
                                <span className="text-emerald-600 text-lg font-semibold capitalize group-hover:text-emerald-700 transition-colors text-center">{category.name}</span>
                                {/* Optionally add a short description or product count */}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;
