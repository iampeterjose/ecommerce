"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

const FeaturedCard = ({products, title, error, link, pic}) => {

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <>
        <span className="block border-t border-emerald-100 my-10"></span>
        <div className="flex flex-col md:flex-row py-8 px-2 md:px-8 gap-6 bg-white rounded-2xl shadow-lg items-center">
            {/* Left: Category Image & Title */}
            <div className="w-full md:w-[260px] h-fit relative flex flex-col items-center justify-center mb-4 md:mb-0">
                <img src={pic} alt={title} className="w-full h-[180px] md:w-[180px] md:h-[180px] object-cover rounded-xl shadow-md border border-emerald-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-emerald-900/60 to-transparent rounded-xl">
                    <h1 className="text-xl md:text-2xl text-white font-bold drop-shadow mb-2">{title}</h1>
                    <Link href={link.startsWith('/') ? link : `/products/${link}` }>
                        <span className="text-xs md:text-sm font-semibold text-emerald-700 bg-white px-5 py-2 rounded-full shadow hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">Show all</span>
                    </Link>
                </div>
            </div>
            {/* Right: Product List */}
            <div className="overflow-x-auto w-full">
                <ul className="flex gap-4 px-2 whitespace-nowrap">
                {products.length > 0 ? products.slice(0,6).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className="flex flex-col min-w-[180px] bg-emerald-50 border border-emerald-100 px-3 py-4 rounded-xl hover:shadow-lg transition-shadow duration-200 hover:scale-105"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <p className={`z-10 text-xs font-semibold bg-rose-500 w-fit my-2 px-2 py-0.5 text-white rounded-full ${product.discountPercentage < 10 ? "opacity-0" : ""}`}>Sale {product.discountPercentage.toFixed(0)}%</p>
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center hover:text-emerald-700">
                            <div className="flex justify-center w-full mb-2">
                                <motion.img 
                                    src={product.thumbnail} alt={product.title} 
                                    className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-lg border border-emerald-100 bg-white"
                                    whileHover={{ scale: 1.1}}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </div> 
                            <span className="block border-t border-emerald-200 border-dashed w-full py-1"></span>
                            <div className="w-full text-center">
                                <p className="text-xs font-semibold text-emerald-500">{product.brand}</p>
                                <h2 className="text-sm md:text-md font-semibold text-emerald-700">{truncateText(product.title, 15)}</h2>
                            </div>
                        </Link>
                        <div className="flex justify-between items-center mt-2 gap-2">
                            <p className="text-base font-semibold text-emerald-700">${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)} <span className="text-gray-400 text-xs line-through">{product.price}</span></p>
                            <FaStar size={18} className="text-yellow-400" />
                        </div>
                    </motion.li>
                )) : (
                    <p className="text-emerald-700 font-semibold">{error}</p>
                )}
                </ul>
            </div>
        </div>
        </>
    )
}

export default FeaturedCard;