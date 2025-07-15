"use client";
import useProductStore from "@/app/store/productStore";
import { useState, useEffect } from "react";
import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";
import { motion } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "@/components/Checkout";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import AddressForm from "@/components/AddressForm";
import { FiArrowLeft } from "react-icons/fi";

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
    const totalPrice = parseFloat(subTotal) + parseFloat(percentageValue) + parseFloat(shippingFee);

    if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined){
        throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    return (
        <div className="flex flex-col py-10 md:py-8 min-h-screen bg-[#F5F5F5] px-2 md:px-10 lg:px-32 pt-24 md:pt-5">
            {/* Floating Back Button */}
            <button
                className="fixed top-24 left-4 z-30 flex items-center gap-2 bg-white border border-[#1976D2]/20 shadow-lg rounded-full px-4 py-2 text-[#1976D2] font-bold hover:bg-[#1976D2]/10 transition-colors duration-200"
                onClick={() => window.history.back()}
                aria-label="Go back"
            >
                <FiArrowLeft size={22} />
                <span className="hidden md:inline">Back</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1976D2] mb-2 tracking-tight flex items-center gap-3 text-center">
                Checkout
            </h1>
            <Link href="/cart">
                <p className="text-right mt-4 mb-6 text-sm font-semibold underline text-[#1976D2] hover:text-[#FF6F00] transition-colors">Go back to cart</p>
            </Link>
            <div className="flex flex-col md:flex-row rounded-3xl border border-[#1976D2]/20 bg-white overflow-hidden">
                {/* Order Summary */}
                <div className="w-full md:w-1/2 bg-[#F5F5F5] p-6 md:p-10 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-[#1976D2] mb-2 text-center">Order Summary</h2>
                    <ul className="flex flex-col gap-4">
                        {cart.map((item) => (
                            <li key={item.id} className="flex justify-between items-center border-b border-[#1976D2]/20 pb-4 last:border-b-0">
                                <div className="flex items-center gap-4">
                                    <img src={item.thumbnail} alt={item.title} className="w-[70px] h-[70px] bg-white rounded-xl border border-[#1976D2]/20 shadow-sm" />
                                    <div className="flex flex-col gap-1 font-semibold text-[#1976D2]">
                                        <span className="text-xs font-bold uppercase tracking-wide text-[#FF6F00]">{item.brand}</span>
                                        <span className="text-base font-bold text-[#1976D2]">{item.title}</span>
                                        <span className="text-xs text-[#1976D2]">x {item.quantity}</span>
                                    </div>
                                </div>
                                <div className="text-lg font-bold text-[#1976D2]">${(item.quantity * item.price).toFixed(2)}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-3 mt-6 bg-white rounded-xl shadow p-4 border border-[#1976D2]/20">
                        <div className="flex justify-between text-base text-[#424242]">
                            <span>Subtotal</span>
                            <span>${subTotal}</span>
                        </div>
                        <div className="flex justify-between text-base text-[#424242]">
                            <span>Shipping</span>
                            <span>${shippingFee}</span>
                        </div>
                        <div className="flex justify-between text-base text-[#424242]">
                            <span>Taxes</span>
                            <span>${percentageValue}</span>
                        </div>
                        <div className="border-t border-dashed border-[#1976D2]/20 my-2"></div>
                        <div className="flex justify-between font-extrabold text-lg text-[#1976D2]">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                {/* Payment & Address */}
                <div className="w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col gap-8 justify-center">
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: convertToSubcurrency(totalPrice),
                            currency: "usd",
                        }}
                    >
                        <div className="mb-8">
                            <AddressForm />
                        </div>
                        <Checkout amount={totalPrice} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

export default page;