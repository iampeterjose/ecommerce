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
        <div className="flex flex-col py-16 md:py-5 min-h-screen">
            <h1 className="text-2xl text-customBlue2 font-semibold">
                Shopping Cart
            </h1>
            <Link href="/products"><p className="text-right mt-10 mb-2 text-sm font-semibold underline text-customBlue2">Continue shopping</p></Link>
            {totalQuantity > 0 ? (
                <>
                <div className={`overflow-x-auto rounded-md mb-10`}>
                    <table className="min-w-full text-left border-spacing-y-1">
                        <thead className={`w-full hidden ${isOpen ? "md:hidden lg:table-header-group" : "md:table-header-group"} `}>
                            <tr className="bg-lightBg text-xs text-slate-500">
                                <th className="md:pl-5 lg:pl-10 py-4">Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={`block ${isOpen ? "md:block lg:table-row-group" : "md:table-row-group"} w-full`}>
                            {cart.map((item) => (
                                <tr key={item.id} className={`bg-lightBg border-b-2 border-t-2 border-white block ${isOpen ? "md:block lg:table-row" : "md:table-row"}`}>
                                    <td className={`md:pl-5 lg:pl-10 py-5 md:w-[40%] block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"} px-1 min-w-full`}>
                                        <span className="flex">
                                            <img src={item.thumbnail} alt={item.title} className="w-[75px] h-[75px]" />
                                            <p className="flex flex-col justify-center items-start text-customBlue2 md:text-normal xl:text-lg font-semibold">
                                                <span className="text-slate-500 text-sm">{item.brand}</span>
                                                <Link href={`product/${item.id}`}><span className="hover:text-blue-500 hover:underline">{item.title}</span></Link>
                                            </p>
                                        </span>
                                    </td>

                                    {/* Mobile View: Combine Price and Total */}
                                    <td className={`block ${isOpen ? "md:block lg:hidden" : "md:hidden"} text-customBlue2 md:text-normal xl:text-lg font-semibold`}>
                                        <span className="flex gap-10 justify-between mx-20">
                                            <span>${item.price}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </span>
                                    </td>

                                    {/* Price on Larger Screens */}
                                    <td className={`hidden ${isOpen ? "md:hidden lg:table-cell" : "md:table-cell"} text-customBlue2 md:text-normal xl:text-lg font-semibold`}>${item.price}</td>

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
                                    <td className={`hidden ${isOpen ? "md:hidden lg:table-cell" : "md:table-cell"} text-customBlue2 md:text-normal xl:text-lg font-semibold`}>${(item.price * item.quantity).toFixed(2)}</td>

                                    {/* Remove Button */}
                                    <td className={`block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"} py-4`}>
                                        <span 
                                            className="flex text-slate-500 md:text-xs xl:text-sm underline mx-20 cursor-pointer"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <Link href="/cart/checkout">
                        <motion.button 
                            className="bg-customOrange2 text-white font-base font-semibold px-5 py-2 w-fit rounded-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Checkout
                        </motion.button>
                    </Link>
                </div>
                </>
            ) : (
                <div className="bg-white rounded-md mb-10 py-20">
                    <div className="flex flex-col justify-center items-center text-customBlue2 gap-4">
                        <FaCartArrowDown size={50} color="#eeeeee" />
                        <p className="text-lg font-semibold">Your Cart is Empty</p>
                        <Link href="/products" className="bg-customOrange2 text-white px-5 py-2 text-sm font-semibold rounded-md">Shop Now</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
