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
        <div className="relative flex flex-col md:flex-row py-8 px-2 md:px-8 gap-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-100/60 items-center group transition-all duration-300 hover:shadow-emerald-200">
            {/* Left: Category Image & Title */}
            <div className="w-full md:w-[260px] h-fit relative flex flex-col items-center justify-center mb-4 md:mb-0">
                <div className="relative w-full h-[180px] md:w-[260px] md:h-[180px] flex items-center justify-center">
                    <img src={pic} alt={title} className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-emerald-100 group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide uppercase">{title}</div>
                </div>
                <Link href={link.startsWith('/') ? link : `/products/${link}` } className="mt-4">
                    <span className="text-xs md:text-sm font-semibold text-white bg-emerald-600 px-6 py-2 rounded-full shadow hover:bg-emerald-700 transition-colors cursor-pointer border border-emerald-700/30">Show all</span>
                </Link>
            </div>
            {/* Right: Product List */}
            <div className="overflow-x-auto w-full">
                <ul className="flex gap-4 px-2 whitespace-nowrap">
                {products.length > 0 ? products.slice(0,6).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className="relative flex flex-col bg-white/70 backdrop-blur-md border border-emerald-100 rounded-3xl shadow-lg hover:shadow-emerald-300 transition-all duration-200 group overflow-hidden p-3 md:p-4 min-w-[170px] max-w-[180px]"
                        whileHover={{ scale: 1.035 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Sale badge */}
                        <span className={`absolute top-4 left-4 z-10 text-xs md:text-sm font-bold px-3 py-1 rounded-full shadow-lg transition-all duration-200 ${product.discountPercentage < 10 ? 'opacity-0' : 'bg-rose-500 text-white scale-110'}`}>
                            Sale {product.discountPercentage.toFixed(0)}%
                        </span>
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center group hover:text-emerald-700">
                            <div className="relative flex justify-center w-full aspect-square mb-3 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-100 overflow-hidden border border-emerald-100 shadow-sm">
                                <motion.img 
                                    src={product.thumbnail} alt={product.title} 
                                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                                />
                            </div> 
                            <div className="w-full text-center space-y-1">
                                <p className="text-xs font-semibold text-emerald-500 tracking-wide uppercase">{product.brand}</p>
                                <h2 className="text-base md:text-lg font-bold text-emerald-800 leading-tight">{truncateText(product.title, 15)}</h2>
                            </div>
                        </Link>
                        <div className="flex justify-between items-center w-full mt-3">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-emerald-100/80 text-emerald-700 font-bold rounded-full text-base md:text-lg shadow-sm">
                                    ${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-400 line-through font-semibold">${product.price}</span>
                            </div>
                            <span className="flex items-center gap-1 bg-white/70 backdrop-blur rounded-full px-2 py-1 shadow text-emerald-600 font-semibold">
                                <FaStar size={16} className="text-yellow-400" />
                                <span className="text-xs">{product.rating}</span>
                            </span>
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