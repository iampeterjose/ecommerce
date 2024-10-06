"use client";
import { ImCart } from "react-icons/im";
import useProductStore from "@/app/store/productStore";
import { useState, useEffect } from "react";
import Link from "next/link";

const Cart = () => {
    const { isOpen, setIsOpen, totalQuantity } = useProductStore();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevent rendering until mounted

    return (
        <>
        {totalQuantity > 0 && (
            <Link href="/cart">
                <div className="flex md:hidden fixed z-20 right-0 top-16 mx-4">
                    <span className="bg-customDark text-white rounded-full p-4 shadow-md shadow-customDark2"><ImCart size={20} /></span>
                    <span className="absolute right-0 rounded-full bg-red-600 px-2 text-normal text-white">{totalQuantity}</span>
                </div>
            </Link>
        )}
        </>
    )
}

export default Cart