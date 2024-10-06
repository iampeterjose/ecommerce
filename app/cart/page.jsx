"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import useProductStore from "../store/productStore";
import Button from "@/components/Button";

const Page = () => {
    const { cart, totalQuantity, isOpen } = useProductStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevent rendering until mounted

    return (
        <div className="flex flex-col py-16 md:py-5 min-h-screen">
            <div className="flex items-baseline justify-between">
                <h1 className="text-2xl text-customDark font-semibold">
                    Shopping Cart
                </h1>
                <p className="text-sm font-semibold underline text-customDark2">Continue shopping</p>
            </div>
            {totalQuantity > 0 ? (
                <>
                <div className={`overflow-x-auto my-10 rounded-md`}>
                    <table className="min-w-full text-left border-spacing-y-1">
                        <thead className={`w-full hidden ${isOpen ? "md:hidden lg:table-header-group" : "md:table-header-group"} `}>
                            <tr className="bg-white text-xs text-slate-500">
                                <th className="md:pl-5 lg:pl-10 py-4">Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={`block ${isOpen ? "md:block lg:table-row-group" : "md:table-row-group"} w-full`}>
                            {cart.map((item) => (
                                <tr key={item.id} className={`bg-white border-b-2 border-t-2 border-[#eeeeee] block ${isOpen ? "md:block lg:table-row" : "md:table-row"} py-5`}>
                                    <td className={`md:pl-5 lg:pl-10 py-3 md:w-[40%] block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"} px-1 min-w-full`}>
                                        <span className="flex">
                                            <img src={item.thumbnail} alt={item.title} className="w-[75px] h-[75px]" />
                                            <p className="flex flex-col justify-center items-start text-customDark2 md:text-normal xl:text-lg font-semibold">
                                                <span className="text-slate-500 text-sm">{item.brand}</span>
                                                <span>{item.title}</span>
                                            </p>
                                        </span>
                                    </td>

                                    {/* Mobile View: Combine Price and Total */}
                                    <td className={`block ${isOpen ? "md:block lg:hidden" : "md:hidden"} text-customDark2 md:text-normal xl:text-lg font-semibold`}>
                                        <span className="flex gap-10 justify-between mx-20">
                                            <span>${item.price}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </span>
                                    </td>

                                    {/* Price on Larger Screens */}
                                    <td className={`hidden ${isOpen ? "md:hidden lg:table-cell" : "md:table-cell"} text-customDark2 md:text-normal xl:text-lg font-semibold`}>${item.price}</td>

                                    {/* Button on Mobile and Desktop */}
                                    <td className={`block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"}`}>
                                        <span className="flex justify-center">
                                            <Button quantity={item.quantity} itemId={item.id} isInCart={true} />
                                        </span>
                                    </td>

                                    {/* Total on Larger Screens */}
                                    <td className={`hidden ${isOpen ? "md:hidden lg:table-cell" : "md:table-cell"} text-customDark2 md:text-normal xl:text-lg font-semibold`}>${(item.price * item.quantity).toFixed(2)}</td>

                                    {/* Remove Button */}
                                    <td className={`block ${isOpen ? "md:block lg:table-cell" : "md:table-cell"}`}>
                                        <span className="flex text-slate-500 md:text-xs xl:text-sm underline mx-20">
                                            Remove
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <button className="bg-red-700 text-white font-base font-semibold px-5 py-1 w-fit">
                        Checkout
                    </button>
                </div>
                </>
            ) : (
                <div className="bg-white rounded-md my-10 py-20">
                    <div className="flex flex-col justify-center items-center text-customDark2 gap-4">
                        <FaCartArrowDown size={50} color="#eeeeee" />
                        <p className="text-lg font-semibold">Your Cart is Empty</p>
                        <Link href="/products" className="bg-red-600 text-white px-5 py-2 text-sm font-semibold rounded-md">Shop Now</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;
