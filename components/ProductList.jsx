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
                <p className="text-sm text-emerald-600 font-semibold mb-2">Result: {products.length} products</p>
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
                            className="relative flex flex-col bg-white border border-emerald-100 rounded-2xl shadow-lg hover:shadow-emerald-200 transition-shadow duration-200 p-4 group overflow-hidden"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {/* Sale badge */}
                            <span className={`absolute top-3 left-3 z-10 text-xs font-bold bg-rose-500 px-2 py-0.5 text-white rounded-full shadow ${product.discountPercentage < 10 ? 'opacity-0' : ''}`}>Sale {product.discountPercentage.toFixed(0)}%</span>
                            <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center group-hover:text-emerald-700 transition-colors">
                                <div className="flex justify-center w-full mb-2 relative">
                                    <motion.img
                                        src={product.thumbnail} alt={product.title}
                                        className="w-[110px] h-[110px] md:w-[150px] md:h-[170px] object-cover rounded-xl border border-emerald-100 bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200"
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.96 }}
                                    />
                                </div>
                                <div className="w-full text-center mt-2">
                                    <p className="text-xs font-semibold text-emerald-500 mb-1">{product.brand}</p>
                                    <h2 className="text-base md:text-lg font-bold text-emerald-700 mb-1">{truncateText(product.title, 30)}</h2>
                                </div>
                                <span className="block border-t border-emerald-100 border-dashed w-full my-2"></span>
                                <div className="flex justify-between items-center w-full mt-1">
                                    <p className="text-lg font-bold text-emerald-700">${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)} <span className="text-gray-400 text-xs line-through">{product.price}</span></p>
                                    <span className="flex items-center gap-1"><FaStar size={16} className="text-yellow-400" /><span className="text-xs text-emerald-500 font-semibold">{product.rating}</span></span>
                                </div>
                            </Link>
                        </motion.li>
                    )) : (
                        <p className="text-emerald-700 font-semibold col-span-full">No products found.</p>
                    )}
                </motion.ul>
            </AnimatePresence>
        </>
    );
};

export default ProductList;
