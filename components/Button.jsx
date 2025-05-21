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
        <div className="flex justify-between items-center gap-2 border-2 border-emerald-400 bg-white shadow-md min-w-full rounded-xl px-2 py-1">
            <motion.span
                className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition-colors duration-150"
                onClick={minusCount}
                whileTap={{ scale: 0.85 }}
                tabIndex={0}
                role="button"
                aria-label="Decrease quantity"
            >
                <HiMinusSmall size={22} />
            </motion.span>
            <p className="px-2 py-1 text-lg font-bold w-14 text-center text-emerald-700 select-none">
                {isInCart ? quantity : count}
            </p>
            <motion.span
                className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition-colors duration-150"
                onClick={addCount}
                whileTap={{ scale: 0.85 }}
                tabIndex={0}
                role="button"
                aria-label="Increase quantity"
            >
                <GoPlus size={22} />
            </motion.span>
        </div>
    );
}

export default Button;
