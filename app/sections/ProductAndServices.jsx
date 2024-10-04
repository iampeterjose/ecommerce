"use client";
import { BsHandThumbsUp } from "react-icons/bs";
import { productAndServices } from "../constants";
import useProductStore from "../store/productStore";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const ProductAndServices = () => {
    const { isOpen } = useProductStore();

    return (
        <AnimatePresence>
        <motion.section 
            className="md:p-4 mt-10"
            initial={{ opacity: 0, y: 20 }}  // Start off invisible and below
            animate={{ opacity: 1, y: 0 }}    // Fade in and move to original position
            exit={{ opacity: 0, y: 20 }}       // Fade out and move below again
            transition={{ duration: 1, delay: 1.5 }} // Staggered entrance
        >
            <div className={`flex flex-col items-center gap-4 py-6`}>
                <h1 className="text-2xl font-semibold text-slate-700">Our product and services</h1>
                <p className={`text-base text-slate-500 text-start ${isOpen ? "text-start lg:text-center" : "md:text-center"}`}>
                Experience Lightning-Fast Delivery on a Wide Range of Products—<br/>
                From Beauty and Fragrances to Furniture and Electronics!<br/>
                Shop Now and Enjoy Quick Access to Quality Items,<br/>
                Including Groceries, Home Decor, Fashion, and More! 
                </p>
            </div>
            <div className={`flex flex-col ${isOpen ? "md:flex-col lg:flex-row" : "md:flex-row"} gap-10 py-4 ${isOpen ? "lg:px-0 xl:px-32" : "lg:px-40"}`}>
                <div className="flex flex-col gap-6 md:gap-0 md:justify-evenly w-full">
                    {productAndServices.map((item,i) => (
                        <>
                        <div key={i} className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2">
                                <div>
                                    <BsHandThumbsUp size={36} className="border border-softgreen rounded-full bg-white p-2 text-softgreen" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-semibold text-softgreen">{item.title}</h2>
                                    <p className="text-sm text-slate-700">{item.desc}</p>
                                    <span className="border-b border-slate-400 mt-4"></span>
                                </div>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
                <div className="grid gap-4 w-full">
                    <div>
                        <motion.img 
                            src="/assets/onlineshopping.jpg" 
                            alt="Online Shopping" 
                            className="w-full h-60 rounded-md shadow-lg shadow-slate-500" 
                            whileHover={{ scale: 1.1 }}
                            onHoverStart={e => {}}
                            onHoverEnd={e => {}}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <motion.img 
                            src="assets/pic2.jpg" 
                            alt="Pic2" 
                            className="h-52 max-w-full rounded-md shadow-lg shadow-slate-500" 
                            whileHover={{ scale: 1.1 }}
                            onHoverStart={e => {}}
                            onHoverEnd={e => {}}
                        />
                        <motion.img 
                            src="assets/pic3.png" 
                            alt="Pic3" 
                            className="h-52 max-w-full bg-customBlue2 px-2 rounded-md shadow-lg shadow-slate-500" 
                            whileHover={{ scale: 1.1 }}
                            onHoverStart={e => {}}
                            onHoverEnd={e => {}}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
        </AnimatePresence>
    )
}

export default ProductAndServices