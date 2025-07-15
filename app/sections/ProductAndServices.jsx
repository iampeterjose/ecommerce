"use client";
import { BsHandThumbsUp } from "react-icons/bs";
import { productAndServices } from "../constants";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const ProductAndServices = () => {
    return (
        <AnimatePresence>
        <motion.section 
            className="w-full bg-[#F5F5F5] px-2 md:px-32 py-12 mt-16 border border-[#E3E3E3]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <div className="flex flex-col items-center gap-4 mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#1976D2] mb-2 text-center drop-shadow">Our Products & Services</h1>
                <p className="text-center text-[#424242] md:text-lg max-w-2xl">
                    Experience lightning-fast delivery on a wide range of products—from beauty and fragrances to furniture and electronics!<br/>
                    Shop now and enjoy quick access to quality items, including groceries, home decor, fashion, and more!
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 py-4">
                {/* Left: Features List */}
                <div className="flex flex-col gap-8 md:gap-10 md:justify-evenly w-full">
                    {productAndServices.map((item,i) => (
                        <div key={i} className="flex items-start gap-4 bg-white rounded-xl shadow p-5 border border-[#E3E3E3]">
                            <div className="flex items-center justify-center w-12 h-12 bg-[#1976D2]/10 rounded-full">
                                <BsHandThumbsUp size={28} className="text-[#1976D2]" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="font-bold text-[#1976D2] text-base md:text-lg mb-1">{item.title}</h2>
                                <p className="text-xs md:text-sm text-[#424242]">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Right: Images */}
                <div className="grid gap-4 w-full md:w-1/2">
                    <motion.img 
                        src="/assets/onlineshopping2.jpg" 
                        alt="Online Shopping" 
                        className="w-full h-60 rounded-xl shadow-lg border border-[#1976D2]/20 object-cover transition-transform duration-300 hover:scale-105" 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    />
                    <div className="grid grid-cols-2 gap-5">
                        <motion.img 
                            src="/assets/products.jpeg" 
                            alt="Products" 
                            className="h-52 w-full rounded-xl shadow-lg border border-[#1976D2]/20 object-cover transition-transform duration-300 hover:scale-105" 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        />
                        <motion.img 
                            src="/assets/addtocart.jpg" 
                            alt="Add to Cart" 
                            className="h-52 w-full rounded-xl shadow-lg border border-[#1976D2]/20 object-cover transition-transform duration-300 hover:scale-105" 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
        </AnimatePresence>
    )
}

export default ProductAndServices;