import useProductStore from "@/app/store/productStore";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ProductList = ({ products }) => {
    const { isOpen } = useProductStore();

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <>
            <span>
                <p className="text-xs md:text-sm text-[#1976D2] font-semibold mb-2">Result: {products.length} products</p>
            </span>

            <AnimatePresence>
                <motion.ul
                    className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-6`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                >
                    {products.length > 0 ? products.map((product) => (
                        <motion.li
                            key={product.id}
                            className="relative flex flex-col bg-white border border-[#E3E3E3] rounded-3xl shadow-lg transition-all duration-200 group overflow-hidden p-3 md:p-4 items-center text-center"
                        >
                            {/* Sale badge */}
                            <span className={`absolute top-4 left-4 z-10 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-lg transition-all duration-200 ${product.discountPercentage < 10 ? 'opacity-0' : 'bg-[#E53935] text-white scale-110'}`}>
                                Sale {product.discountPercentage.toFixed(0)}%
                            </span>
                            <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center group">
                                <div className="relative flex justify-center w-full aspect-square mb-2 overflow-hidden shadow-sm">
                                    <motion.img 
                                        src={product.thumbnail} alt={product.title} 
                                        className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                                        whileHover={{ scale: 1.50 }}
                                    />
                                </div> 
                                <div className="w-full text-center space-y-1">
                                    <p className="text-[10px] md:text-xs font-semibold text-[#1976D2] tracking-wide uppercase">{product.brand}</p>
                                    <h2 className="text-xs md:text-sm font-bold text-[#424242] leading-tight drop-shadow-sm">{truncateText(product.title, 15)}</h2>
                                </div>
                            </Link>
                            <div className="flex justify-between items-center w-full mt-2 text-center">
                                <div className="flex items-center gap-1 justify-center w-full">
                                    <span className="px-2 py-1 bg-[#43A047]/10 text-[#1976D2] font-bold rounded-full text-xs md:text-sm shadow-sm">
                                        ${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-[#E53935] line-through font-semibold">${product.price}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 border bg-white rounded-full px-1 py-1 shadow text-[#1976D2] font-semibold mt-2 justify-center w-full text-center">
                                <FaStar size={14} className="text-[#FF6F00]" />
                                <span className="text-[10px] md:text-xs">{product.rating}</span>
                            </div>
                        </motion.li>
                    )) : (
                        <p className="text-[#E53935] font-semibold col-span-full">No products found.</p>
                    )}
                </motion.ul>
            </AnimatePresence>
        </>
    );
};

export default ProductList;
