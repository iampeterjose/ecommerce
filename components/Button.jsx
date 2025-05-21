"use client";
import useProductStore from "@/app/store/productStore";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";
import { motion } from "framer-motion";

const Button = ({ quantity, itemId, isInCart }) => {
    const { count, setCount, updateQuantity } = useProductStore();

    const addCount = () => {
        if (isInCart) {
            updateQuantity(itemId, quantity + 1);
        } else {
            setCount(c => c + 1);
        }
    };

    const minusCount = () => {
        if (isInCart) {
            if (quantity > 1) {
                updateQuantity(itemId, quantity - 1);
            } else {
                // If the quantity is 1, we want to remove the item from the cart
                updateQuantity(itemId, 0);
            }
        } else {
            if (count > 0) {
                setCount(c => c - 1);
            }
        }
    };

    useEffect(() => {
        console.log(`Current count: `, count);
    }, [count]);

    return (
        <div className="flex justify-between items-center gap-2 min-w-full rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100 border-2 border-emerald-200 shadow-lg px-2 py-1 md:px-4 md:py-2 backdrop-blur-md">
            <motion.button
                className="cursor-pointer flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                onClick={minusCount}
                whileTap={{ scale: 0.9 }}
                tabIndex={0}
                aria-label="Decrease quantity"
                type="button"
            >
                <HiMinusSmall size={26} />
            </motion.button>
            <p className="px-2 py-1 text-xl md:text-2xl font-extrabold w-14 text-center text-emerald-700 select-none bg-white/70 rounded-lg shadow-inner border border-emerald-100">
                {isInCart ? quantity : count}
            </p>
            <motion.button
                className="cursor-pointer flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/80 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                onClick={addCount}
                whileTap={{ scale: 0.9 }}
                tabIndex={0}
                aria-label="Increase quantity"
                type="button"
            >
                <GoPlus size={26} />
            </motion.button>
        </div>
    );
}

export default Button;
