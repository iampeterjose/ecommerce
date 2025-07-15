"use client";
import { FaShippingFast } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import Link from "next/link";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";

const Hero = () => {
    return (
        <section className="flex flex-col min-h-screen bg-[#F5F5F5] relative" id="/">
            <motion.div 
                className="w-full relative flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Carousel />
                {/* Hero Text Overlay */}
                <div className="relative w-[95vw] md:w-auto bg-white shadow-xl rounded-xl px-2 md:px-16 py-6 md:py-12 flex flex-col items-center gap-4 border-2 border-[#E0E0E0] z-20 mt-[-4rem] md:mt-[-6rem] mb-6 md:mb-10">
                    <h1 className="text-2xl md:text-5xl font-extrabold text-[#1976D2] text-center leading-tight drop-shadow-sm">
                        Quality Products,<br/>
                        <span className="text-3xl md:text-6xl text-[#FF6F00] block mt-2">Unbeatable Prices!</span>
                    </h1>
                    <p className="text-[#424242] text-base md:text-lg text-center max-w-xl mt-2">Shop the latest trends, enjoy fast delivery, and experience seamless online shopping with exclusive deals just for you.</p>
                    <Link href="#featured">
                        <motion.button 
                            className="bg-[#FF6F00] px-6 py-2 text-white font-semibold rounded-full shadow hover:bg-[#FFA040] transition-colors mt-2 text-lg"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                        >Find More</motion.button>
                    </Link>
                </div>
            </motion.div>
            {/* Features Bar */}
            <div className="relative z-10 border-t-2 p-5 bg-white text-[#1976D2] md:text-lg overflow-x-auto mt-0 shadow-inner">
                <div className="flex gap-8 p-2 whitespace-nowrap justify-between items-center max-w-5xl mx-auto">
                    <h2 className="flex items-center gap-2 font-semibold"><span className="bg-[#F5F5F5] rounded-full px-2 py-1 text-[#424242]">Brand New</span></h2>
                    <h2 className="flex items-center gap-2 font-semibold"><FaShippingFast size={22} className="text-[#1976D2]" />Fast Delivery</h2>
                    <h2 className="flex items-center gap-2 font-semibold"><MdBookOnline size={22} className="text-[#1976D2]" />Online Payment</h2>
                    <h2 className="flex items-center gap-2 font-semibold"><RiDiscountPercentFill size={22} className="text-[#FF6F00]" />Special Discount</h2>
                </div>
            </div>
        </section>
    )
}

export default Hero;