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
                    <span className="text-xs md:text-sm font-semibold text-white bg-[#FF6F00] px-5 py-2 rounded-full shadow hover:bg-[#1976D2] transition-colors cursor-pointer border border-[#FF6F00]/30" onClick={()=>setDisplayCount(relatedProducts.total)}>Show all</span>
                )}
            </div>
            <ul className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-6`}>
                {relatedProducts.total > 0 ? relatedProducts.products.slice(0,displayCount).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className="relative flex flex-col items-center justify-center border bg-white border-[#E3E3E3] rounded-3xl transition-all duration-200 group overflow-hidden p-2 md:p-3"
                        whileHover={{}}
                    >
                        {/* Sale badge */}
                        <span className={`absolute top-4 left-4 z-10 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-lg transition-all duration-200 ${product.discountPercentage < 10 ? 'opacity-0' : 'bg-[#E53935] text-white scale-110'}`}>
                            Sale {product.discountPercentage.toFixed(0)}%
                        </span>
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center group">
                            <div className="relative flex justify-center w-full aspect-square mb-2 overflow-hidden">
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
                    <p className="text-[#E53935] font-semibold col-span-full text-center">No related products found.</p>
                )}
            </ul>
        </div>
    )
}

export default RelatedProducts;