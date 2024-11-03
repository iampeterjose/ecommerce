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
        <span className="border border-lightBg my-10"></span>
        <div className="flex flex-col md:flex-row py-5 px-2 gap-4">
            <div className="md:min-w-[300px] h-fit relative">
                <img src={pic} alt="link" className="w-full md:w-full h-[150px] md:h-[300px] rounded-md" />
                <div className="absolute inset-0 flex flex-col justify-start p-4 hover:bg-opacity-0 bg-black bg-opacity-20 gap-4 rounded-md">
                    <h1 className="text-xl md:text-3xl text-white font-bold">
                        {title}
                    </h1>
                    <Link href={`/products/${link}`}>
                        <span className="text-xs md:text-sm font-semibold text-white bg-customOrange px-5 py-2 rounded-md cursor-pointer">Show all</span>
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <ul className={`flex gap-4 px-2 whitespace-nowrap`}>
                {products.length > 0 ? products.slice(0,6).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className={`flex flex-col min-w-[200px] bg-lightBg px-3 rounded-md hover:cursor-pointer`}
                    >
                    <p className={`z-10 text-sm font-semibold bg-red-600 w-fit my-2 px-1 text-white ${product.discountPercentage < 10 ? "opacity-0" : ""}`}>Sale {(product.discountPercentage).toFixed(0)}%</p>
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col  hover:text-blue-500">
                            <div className="flex justify-center w-full">
                                <motion.img 
                                    src={product.thumbnail} alt={product.title} 
                                    className={`w-[125px] h-[125px] md:w-[150px] md:h-[150px]`}
                                    whileHover={{ scale: 1.1}}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </div> 
                            <span className="border-t border-customBlue2 border-dashed w-full py-1"></span>
                            <div>
                                <p className="text-xs font-semibold text-customBlue2">{product.brand}</p>
                                <h2 className="text-sm md:text-md font-semibold">{truncateText(product.title, 30)}</h2>
                            </div>
                        </Link>
                        <span className="flex justify-between mb-6 gap-2">
                            <p className="text-base font-semibold text-red-700">${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)} <span className="text-customBlue2 text-sm line-through">{product.price}</span></p>
                            <FaStar size={20} className="hover:text-yellow-400 text-slate-300" />
                        </span>
                    </motion.li>
                )) : (
                    <p className="text-customBlue2 font-semibold">{error}</p>
                )}
                </ul>
            </div>
        </div>
        </>
    )
}

export default FeaturedCard