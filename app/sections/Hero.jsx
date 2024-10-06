"use client";
import { FaShippingFast } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import ProductAndServices from "./ProductAndServices";
import Link from "next/link";
import useProductStore from "../store/productStore";
import { motion } from "framer-motion";

const Hero = () => {
    const { isOpen } = useProductStore();
    return (
        <section className="flex flex-col min-h-screen" id="/">
            <motion.div 
                className="w-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img src="/assets/shopping1.png" alt="HeroBg" className={`w-full h-[300px] md:h-[600px] left-0`} />
                <div className="absolute top-40 md:top-60 text-customDark font-bold px-3 md:px-7 py-2 md:py-10 bg-white shadow-lg shadow-customDark2 rounded-e-lg opacity-90 left-0 md:left-auto">
                    <h1 className="text-md md:text-3xl">
                        Quality Products, <br/><span className="text-xl md:text-5xl">Unbeatable Prices!</span>
                    </h1>
                    <Link href="#featured">
                        <motion.p 
                            className="bg-red-600 px-2 py-1 text-white w-fit mt-2 rounded-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >Find More</motion.p>
                    </Link>
                </div>
                <div className={`grid grid-cols-2 ${isOpen ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-4"} justify-start items-center bg-customDark p-3 text-sm md:text-sm lg:text-lg text-white font-semibold rounded-b-md`}>
                    <h2>Brand New</h2>
                    <h2 className="flex items-center gap-1"><FaShippingFast size={20} />Fast Delivery</h2>
                    <h2 className="flex items-center gap-1"><MdBookOnline size={20} />Online Payment</h2>
                    <h2 className="flex items-center gap-1"><RiDiscountPercentFill size={20} />Special Discount</h2>
                </div>
            </motion.div>
            <ProductAndServices />  
        </section>
    )
}

export default Hero