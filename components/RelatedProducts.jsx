import useProductStore from "@/app/store/productStore";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const RelatedProducts = () => {
    const { product, relatedProducts, setRelatedProducts, isOpen } = useProductStore();
    const [displayCount, setDisplayCount] = useState(5);

    useEffect(() => {
        const fetchRelatedProducts = async() => {
            try {
                const result = await fetch(`https://dummyjson.com/products/category/${product.category}`);
                const data = await result.json();
                setRelatedProducts(data);
            } catch (error) {
                console.log(`Error connecting to server: `,error);
            }
        };

        fetchRelatedProducts();
    },[relatedProducts]);

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                {relatedProducts.total > 6 && (
                    <span className="text-xs md:text-sm font-semibold text-emerald-600 hover:text-emerald-800 cursor-pointer transition-colors duration-150" onClick={()=>setDisplayCount(relatedProducts.total)}>Show all</span>
                )}
            </div>
            <ul className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-5 lg:gap-4`}>
                {relatedProducts.total > 0 ? relatedProducts.products.slice(0,displayCount).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className="relative flex flex-col bg-white border border-emerald-100 rounded-2xl shadow-lg hover:shadow-emerald-200 transition-shadow duration-200 p-3 group overflow-hidden"
                        whileHover={{ y: -2, boxShadow: '0 8px 32px 0 rgba(16,185,129,0.10)' }}
                    >
                        <span className={`absolute top-2 left-2 z-10 text-xs font-bold bg-rose-500 px-2 py-0.5 text-white rounded-full shadow ${product.discountPercentage < 10 ? 'opacity-0' : ''}`}>Sale {(product.discountPercentage).toFixed(0)}%</span>
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center group-hover:text-emerald-700 transition-colors">
                            <div className="flex justify-center w-full py-2">
                                <motion.img 
                                    src={product.thumbnail} alt={product.title} 
                                    className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] object-cover rounded-xl border border-emerald-100 bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200"
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.96 }}
                                />
                            </div> 
                            <span className="block border-t border-emerald-100 border-dashed w-full my-2"></span>
                            <div className="w-full text-center mt-1">
                                <p className="text-xs font-semibold text-emerald-500 mb-1">{product.brand}</p>
                                <h2 className="text-sm md:text-base font-bold text-emerald-700 mb-1">{truncateText(product.title, 18)}</h2>
                            </div>
                        </Link>
                        <div className="flex justify-between items-center w-full mt-1">
                            <p className="text-base font-bold text-emerald-700">${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)} <span className="text-gray-400 text-xs line-through">{product.price}</span></p>
                            <span className="flex items-center gap-1"><FaStar size={16} className="text-yellow-400" /><span className="text-xs text-emerald-500 font-semibold">{product.rating}</span></span>
                        </div>
                    </motion.li>
                )) : (
                    <p className="text-emerald-700 font-semibold col-span-full">No related products found.</p>
                )}
            </ul>
        </div>
    )
}

export default RelatedProducts;