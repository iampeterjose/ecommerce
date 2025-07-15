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
        <div className="relative flex flex-col md:flex-row py-8 px-2 md:px-8 gap-6 bg-white rounded-3xl border-2 items-center group transition-all duration-300">
            {/* Left: Category Image & Title */}
            <div className="w-full md:w-[260px] h-fit relative flex flex-col items-center justify-center mb-4 md:mb-0">
                <div className="relative w-full h-[180px] md:w-[260px] md:h-[180px] flex items-center justify-center group">
                    <img src={pic} alt={title} className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-[#1976D2]/30 transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 bg-[#1976D2] text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide uppercase">{title}</div>
                </div>
                <Link href={link.startsWith('/') ? link : `/products/${link}` } className="mt-4">
                    <span className="text-xs md:text-sm font-semibold text-white bg-[#FF6F00] px-6 py-2 rounded-full shadow hover:bg-[#1976D2] transition-colors cursor-pointer border border-[#FF6F00]/30">Show all</span>
                </Link>
            </div>
            {/* Right: Product List */}
            <div className="overflow-x-auto w-full">
                <ul className="flex gap-4 px-2 whitespace-nowrap">
                  {products.length > 0 ? products.slice(0,6).map((product) => (
                    <motion.li 
                      key={product.id} 
                      className="relative flex flex-col items-center justify-center border rounded-3xl shadow-lg transition-all duration-200 group overflow-hidden p-2 md:p-3 min-w-[150px] max-w-[170px]"
                      whileHover={{}}
                    >
                      {/* Sale badge */}
                      <span className={`absolute top-4 left-4 z-10 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-lg transition-all duration-200 ${product.discountPercentage < 10 ? 'opacity-0' : 'bg-[#E53935] text-white scale-110'} text-center`}>
                        Sale {product.discountPercentage.toFixed(0)}%
                      </span>
                      <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center group">
                        <div className="relative flex justify-center w-full aspect-square mb-2 rounded-2xl bg-white overflow-hidden">
                          <motion.img 
                            src={product.thumbnail} alt={product.title} 
                            className="w-full h-full object-cover transition-transform duration-300"
                            whileHover={{ scale: 1.50 }}
                          />
                        </div> 
                        <div className="w-full text-center space-y-1">
                          <p className="text-[10px] md:text-xs font-semibold text-[#1976D2] tracking-wide uppercase text-center">{product.brand}</p>
                          <h2 className="text-xs md:text-sm font-bold text-[#424242] leading-tight drop-shadow-sm text-center">{truncateText(product.title, 15)}</h2>
                        </div>
                      </Link>
                      <div className="flex flex-col items-center justify-center w-full mt-2">
                        <div className="flex items-center gap-1 justify-center">
                          <span className="px-2 py-1 bg-[#43A047]/10 text-[#1976D2] font-bold rounded-full text-xs md:text-sm shadow-sm text-center">
                            ${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)}
                          </span>
                          <span className="text-[10px] md:text-xs text-[#E53935] line-through font-semibold text-center">${product.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 border bg-white rounded-full px-1 py-1 shadow text-[#1976D2] font-semibold mt-2 justify-center w-full text-center">
                        <FaStar size={14} className="text-[#FF6F00]" />
                        <span className="text-[10px] md:text-xs text-center">{product.rating}</span>
                      </div>
                    </motion.li>
                  )) : (
                    <p className="text-[#E53935] font-semibold text-center">{error}</p>
                  )}
                </ul>
            </div>
        </div>
        </>
    )
}

export default FeaturedCard;