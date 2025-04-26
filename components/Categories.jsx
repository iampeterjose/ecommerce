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
        <div className="px-2 md:px-32 -mt-54 md:mt-2">
            <h1 className="text-3xl my-2 font-montserrat font-semibold text-customBlue2">Categories</h1>
            <div className="border-t-2 py-5 overflow-x-auto">
                <div className="flex gap-4 p-2 whitespace-nowrap">
                    {categories.map((category, index) => (
                        <motion.span key={index}
                            className="flex-shrink-0 flex-grow-0 flex-basis-auto p-2 text-white bg-customOrange2 rounded-md shadow-md md:text-lg"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                        <Link href={`products/category/${category.slug}`} >
                            <p>
                                    {category.name}
                            </p> {/* Render the name property */}
                        </Link>
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
