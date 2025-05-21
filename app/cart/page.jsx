"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import useProductStore from "../store/productStore";
import Button from "@/components/Button";
import { motion } from "framer-motion";

const Page = () => {
    const { cart, totalQuantity, isOpen, removeFromCart, updateQuantity } = useProductStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleRemove = (id) => {
        const confirmed = window.confirm("Are you sure you want to remove this item from your cart?");
        if (confirmed) {
            removeFromCart(id);
        }
    };

    if (!isMounted) return null; // Prevent rendering until mounted

    return (
        <div className="flex flex-col py-10 md:py-8 min-h-screen bg-emerald-50/40 px-2 md:px-10 lg:px-32 pt-24 md:pt-5">
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2 tracking-tight flex items-center gap-3">
                <FaCartArrowDown size={32} className="text-emerald-400" />
                Shopping Cart
            </h1>
            <div className="flex justify-end mb-6">
                <Link href="/products">
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-emerald-50 border border-emerald-200 shadow-lg rounded-full px-6 py-2 text-emerald-700 font-extrabold hover:bg-emerald-200 hover:text-emerald-900 transition-all duration-200 text-base drop-shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        aria-label="Continue shopping"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Continue shopping
                    </button>
                </Link>
            </div>
            {totalQuantity > 0 ? (
                <>
                <div className="overflow-x-auto rounded-2xl mb-10 bg-white shadow-xl border border-emerald-100">
                    <table className="min-w-full text-left border-spacing-y-1">
                        <thead className={`w-full hidden ${isOpen ? "md:hidden lg:table-header-group" : "md:table-header-group"} `}>
                            <tr className="bg-emerald-100 text-xs text-emerald-600">
                                <th className="md:pl-5 lg:pl-10 py-4">Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={`block ${isOpen ? "md:block lg:table-row-group" : "md:table-row-group"} w-full`}>
                            {cart.map((item) => (
                                <tr key={item.id} className={`bg-emerald-50 border-b-2 border-t-2 border-white block ${isOpen ? "md:block lg:table-row" : "md:table-row"} transition-all duration-200 hover:bg-emerald-100/60`}>
                                    <td className={`md:pl-5 lg:pl-10 py-5 md:w-[40%] block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"} px-1 min-w-full`}>
                                        <span className="flex gap-4 items-center">
                                            <img src={item.thumbnail} alt={item.title} className="w-[75px] h-[75px] rounded-xl border border-emerald-100 bg-white shadow-sm" />
                                            <p className="flex flex-col justify-center items-start text-emerald-700 md:text-normal xl:text-lg font-semibold">
                                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide">{item.brand}</span>
                                                <Link href={`product/${item.id}`}><span className="hover:text-emerald-600 hover:underline transition-colors">{item.title}</span></Link>
                                            </p>
                                        </span>
                                    </td>
                                    {/* Mobile View: Combine Price and Total */}
                                    <td className={`block ${isOpen ? "md:block lg:hidden" : "md:hidden"} text-emerald-700 md:text-normal xl:text-lg font-semibold`}>
                                        <span className="flex gap-10 justify-between mx-20">
                                            <span>${item.price}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </span>
                                    </td>
                                    {/* Price on Larger Screens */}
                                    <td className={`hidden ${isOpen ? "md:hidden lg:table-cell" : "md:table-cell"} text-emerald-700 md:text-normal xl:text-lg font-semibold`}>${item.price}</td>
                                    {/* Button on Mobile and Desktop */}
                                    <td className={`block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"}`}>
                                        <span className="flex justify-center md:justify-start md:w-[144px] mx-20 md:mx-0">
                                            <Button 
                                                quantity={item.quantity} 
                                                itemId={item.id} 
                                                isInCart={true} 
                                                onChangeQuantity={(newQuantity) => updateQuantity(item.id, newQuantity)}
                                            />
                                        </span>
                                    </td>
                                    {/* Total on Larger Screens */}
                                    <td className={`hidden ${isOpen ? "md:hidden lg:table-cell" : "md:table-cell"} text-emerald-700 md:text-normal xl:text-lg font-semibold`}>${(item.price * item.quantity).toFixed(2)}</td>
                                    {/* Remove Button */}
                                    <td className={`block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"} py-4`}>
                                        <button
                                            className="flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-500 font-bold px-4 py-1 rounded-full shadow-sm hover:bg-rose-100 hover:text-rose-700 transition-all duration-200 text-xs md:text-sm mx-20 focus:outline-none focus:ring-2 focus:ring-rose-300"
                                            onClick={() => handleRemove(item.id)}
                                            aria-label="Remove from cart"
                                            type="button"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <Link href="/cart/checkout">
                        <motion.button 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg text-lg transition-all duration-200"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Checkout
                        </motion.button>
                    </Link>
                </div>
                </>
            ) : (
                <div className="bg-white rounded-2xl mb-10 py-20 shadow-lg border border-emerald-100">
                    <div className="flex flex-col justify-center items-center text-emerald-400 gap-4">
                        <FaCartArrowDown size={60} />
                        <p className="text-lg font-semibold text-emerald-700">Your Cart is Empty</p>
                        <Link href="/products" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 text-base font-bold rounded-xl shadow-md transition-all duration-200">Shop Now</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
