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
                <div className="flex md:hidden fixed z-30 right-4 top-20">
                    <span className="relative flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 border-2 border-emerald-200 rounded-full p-4 shadow-xl hover:bg-emerald-200 transition-all duration-200 cursor-pointer">
                        <ImCart size={22} />
                        <span className="absolute -top-2 -right-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white shadow-md border-2 border-white animate-bounce">
                            {totalQuantity}
                        </span>
                    </span>
                </div>
            </Link>
        )}
        </>
    )
}

export default Cart