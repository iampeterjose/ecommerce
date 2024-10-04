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
                <p className="text-sm text-slate-500 font-semibold">Result: {products.length} products</p>
            </span>

            <AnimatePresence>
                <ul className={`grid lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-3 lg:gap-2`}>
                    {products.length > 0 ? products.map((product, index) => (
                        <motion.li 
                            key={product.id} 
                            className={`flex flex-col bg-white px-3 border-2 rounded-lg hover:cursor-pointer`}
                            whileHover={{ scale: 1.1, backgroundColor:"#f0f0f0" }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}  // Start off invisible and below
                            animate={{ opacity: 1, y: 0 }}    // Fade in and move to original position
                            exit={{ opacity: 0, y: 20 }}       // Fade out and move below again
                            transition={{ duration: 1, delay: index * 0.10 }} // Staggered entrance
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
                        <p className="text-slate-700 font-semibold">No products found.</p>
                    )}
                </ul>
            </AnimatePresence>
        </>
    );
};

export default ProductList;
