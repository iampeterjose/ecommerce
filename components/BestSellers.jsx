"use client";
import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

const BestSellers = () => {
    const { bestSellers, isOpen } = useProductStore();

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <div className="border-t border-customBlue py-2 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-3xl text-softgreen font-bold mb-2">
                    Best Sellers
                </h1>
                <Link href="/products/bestsellers"><span className="text-xs md:text-sm font-semibold text-blue-500 cursor-pointer">Show all</span></Link>
            </div>
            <ul className={`grid lg:grid-cols-5 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-3 lg:gap-2`}>
            {bestSellers.length > 0 ? bestSellers.slice(0,5).map((product) => (
                <motion.li 
                    key={product.id} 
                    className={`flex flex-col bg-white px-3 border-2 rounded-lg hover:cursor-pointer`}
                    whileHover={{ scale: 1.1, backgroundColor:"#f0f0f0" }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                        <div className="flex justify-center w-full py-2">
                            <img src={product.thumbnail} alt={product.title} className={`w-[100px] h-[100px] ${isOpen ? "w-[100px] h-[100px]" : "md:w-[125px] md:h-[125px]"} `}/>
                        </div> 
                        <span className="border-t-2 border-dashed w-full py-1"></span>
                        <div>
                            <h2 className="text-sm md:text-md font-semibold">{truncateText(product.title, 10)}</h2>
                        </div>
                    </Link>
                    <span className="flex justify-between mb-2">
                        <p className="text-xs md:text-sm font-semibold text-slate-500">${product.price}</p>
                        <FaStar size={20} className="hover:text-yellow-400 text-slate-300" />
                    </span>
                </motion.li>
            )) : (
                <p className="text-slate-700 font-semibold">No new arrivals yet.</p>
            )}
            </ul>
        </div>
    )
}

export default BestSellers