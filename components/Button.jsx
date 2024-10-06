"use client";
import useProductStore from "@/app/store/productStore";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";

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
        <div className='flex items-center gap-2 border border-customDark2 w-fit rounded-md'>
            <span 
                className='cursor-pointer h-full px-2 py-2 text-customDark2'
                onClick={minusCount}
            >
                <HiMinusSmall size={20} />
            </span>
            <p className='px-2 py-1 text-base w-14 text-center text-customDark2'>
                {isInCart ? quantity : count}
            </p>
            <span 
                className='cursor-pointer h-full px-2 py-2 text-customDark2'
                onClick={addCount}
            >
                <GoPlus size={20} />
            </span>
        </div>
    );
}

export default Button;
