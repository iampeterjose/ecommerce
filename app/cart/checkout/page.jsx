"use client";
import useProductStore from "@/app/store/productStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const page = () => {
    const { cart } = useProductStore();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevent rendering until mounted

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    const subTotal = parseFloat(calculateTotalPrice(cart)).toFixed(2); // Calculate subtotal
    const percentageValue = parseFloat((subTotal) * 0.12).toFixed(2); // Calculate 12% of subtotal
    const shippingFee = parseFloat(15.00).toFixed(2);
    
    // Calculate totalPrice by parsing subTotal and percentageValue back to numbers
    const totalPrice = parseFloat(subTotal) + parseFloat(percentageValue) + parseFloat(shippingFee);

    return (
        <div className="flex flex-col py-16 md:py-5 min-h-screen">
            <h1 className="text-2xl text-customBlue2 font-semibold">
                Checkout
            </h1>
            <Link href="/cart"><p className="text-right mt-10 mb-2 text-sm font-semibold underline text-customBlue2">Go back to cart</p></Link>
            <div className="flex flex-col-reverse md:flex-row b-10 rounded-md">
                <div className="w-full">
                    <form className="flex flex-col gap-1 px-2 md:px-10 py-10 text-sm text-customBlue2">
                        <h2 className="text-lg font-semibold text-customBlue2">Contact Information</h2>
                        <label className="mt-5">Email address</label>
                        <input 
                            className="border p-2 rounded-md"
                            type="email" />
                        <span className="border my-10"></span>
                        <h2 className="text-lg font-semibold text-customBlue2">Shipping Information</h2>
                        <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                            <span className="flex flex-col w-full gap-1">
                                <label>Fist name</label>
                                <input 
                                    className="border p-2 rounded-md"
                                    type="text" />
                            </span>
                            <span className="flex flex-col w-full gap-1">
                                <label>Last name</label>
                                <input 
                                    className="border p-2 rounded-md"
                                    type="text" />
                            </span>
                        </div>
                        <label>Company (optional)</label>
                        <input 
                            className="border p-2 rounded-md"
                            type="text" />
                        <label className="mt-5">Address</label>
                        <input 
                            className="border p-2 rounded-md"
                            type="text" />
                        <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                            <span className="flex flex-col w-full gap-1">
                                <label>Country</label>
                                <select 
                                    className="border p-2 rounded-md"
                                >
                                    <option value="">Philippines</option>
                                </select>
                            </span>
                            <span className="flex flex-col w-full gap-1">
                                <label>Region</label>
                                <select
                                    className="border p-2 rounded-md"
                                >
                                    <option value="">Philippines</option>
                                </select>
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between my-5 gap-4">
                            <span className="flex flex-col w-full gap-1">
                                <label>City</label>
                                <select
                                    className="border p-2 rounded-md"
                                >
                                    <option value="">Philippines</option>
                                </select>
                            </span>
                            <span className="flex flex-col w-full gap-1">
                                <label>Barangay</label>
                                <select
                                    className="border p-2 rounded-md"
                                >
                                    <option value="">Philippines</option>
                                </select>
                            </span>
                            <span className="flex flex-col w-full gap-1">
                                <label>Postal code</label>
                                <input 
                                    className="border p-2 rounded-md"
                                    type="number"/>
                            </span>
                        </div>
                        <label>Phone</label>
                        <input 
                            className="border p-2 rounded-md"
                            type="number" />

                        <motion.button 
                            className="my-4 border-2 bg-customOrange2 text-white rounded-md p-2 font-semibold text-base hover:bg-white hover:border-customOrange2 hover:text-customOrange2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Pay {totalPrice}
                        </motion.button>
                    </form>
                </div>
                <div className="w-full bg-lightBg rounded-t-md md:rounded-e-md">
                    <div className="flex flex-col gap-1 p-2 md:pl-5 md:pr-10 py-10 text-sm text-customBlue2">
                        <h2 className="text-lg">Order Summary</h2>
                        <div className="p-5 rounded-md my-4">
                            <ul className="flex flex-col gap-4">
                                {cart.map((item) => (
                                    <>
                                    <li key={item.id}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span>
                                                <img 
                                                    src={item.thumbnail} alt={item.title} 
                                                    className="w-[100px] h-[100px] bg-white rounded-md"    
                                                />
                                            </span>
                                            <span className="flex flex-col gap-2 font-semibold">
                                                <p>{item.title}</p>
                                                <p>x {item.quantity}</p>
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{(item.quantity * item.price).toFixed(2)}</p>
                                        </div>
                                    </li>
                                    <span className="border"></span>
                                    </>
                                ))}
                            </ul>
                            <div className="flex flex-col gap-5 my-4">
                                <p className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subTotal}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shippingFee}</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Taxes</span>
                                    <span>${percentageValue}</span>
                                </p>
                                <span className="border border-white"></span>
                                <p className="flex justify-between font-semibold text-base">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page