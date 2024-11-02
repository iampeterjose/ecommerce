"use client";
import { FaShippingFast } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";

const Hero = () => {
    return (
        <section className="flex flex-col min-h-screen" id="/">
            <motion.div 
                className="w-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Carousel />
                <div className="absolute top-72 md:top-96 text-customBlue2 font-bold px-3 md:px-7 py-2 md:py-10 bg-white shadow-lg shadow-customDark2 rounded-e-lg opacity-90 left-0 md:left-auto">
                    <h1 className="text-md md:text-3xl">
                        Quality Products, <br/><span className="text-xl md:text-5xl">Unbeatable Prices!</span>
                    </h1>
                    <Link href="#featured">
                        <motion.p 
                            className="bg-customOrange2 px-2 py-1 text-white w-fit mt-2 rounded-md"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >Find More</motion.p>
                    </Link>
                </div>
                <div className="border-t-2 p-5 bg-customOrange2 text-white md:text-lg overflow-x-auto ">
                    <div className={`flex gap-6 p-2 whitespace-nowrap justify-between items-center`}>
                        <h2>Brand New</h2>
                        <h2 className="flex items-center gap-1"><FaShippingFast size={20} />Fast Delivery</h2>
                        <h2 className="flex items-center gap-1"><MdBookOnline size={20} />Online Payment</h2>
                        <h2 className="flex items-center gap-1"><RiDiscountPercentFill size={20} />Special Discount</h2>
                    </div>
                </div>
            </motion.div>  
        </section>
    )
}

export default Hero