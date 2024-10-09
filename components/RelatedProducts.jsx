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
        <div className="border-t border-b border-customBlue2 py-2 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold mb-2">
                    Related Products
                </h1>
                {relatedProducts.total > 6 && (
                    <span className="text-xs md:text-sm font-semibold text-blue-500 cursor-pointer" onClick={()=>setDisplayCount(relatedProducts.total)}>Show all</span>
                )}
            </div>
            <ul className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-3 lg:gap-2`}>
                {relatedProducts.total > 0 ? relatedProducts.products.slice(0,displayCount).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className={`flex flex-col bg-lightBg px-3 rounded-sm hover:cursor-pointer`}
                    >
                        <p className={`absolute z-10 text-sm font-semibold bg-red-600 w-fit my-2 px-1 text-white ${product.discountPercentage < 10 ? "opacity-0" : ""}`}>Sale {(product.discountPercentage).toFixed(0)}%</p>
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                            <div className="flex justify-center w-full py-2">
                                <motion.img 
                                    src={product.thumbnail} alt={product.title} 
                                    className={`w-[125px] h-[125px] ${isOpen ? "w-[125px] h-[125px]" : "md:w-[150px] md:h-[150px]"} `}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            </div> 
                            <span className="border-t border-customBlue2 border-dashed w-full py-1"></span>
                            <div>
                            <p className="text-xs font-semibold text-customBlue2">{product.brand}</p>
                                <h2 className="text-sm md:text-md font-semibold">{truncateText(product.title, 10)}</h2>
                            </div>
                        </Link>
                        <span className="flex justify-between mb-6">
                        <p className="text-base font-semibold text-red-700">${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)} <span className="text-customBlue2 line-through">{product.price}</span></p>
                            <FaStar size={20} className="hover:text-yellow-400 text-slate-300" />
                        </span>
                    </motion.li>
                )) : (
                    <p className="text-customBlue2 font-semibold">No related products found.</p>
                )}
            </ul>
        </div>
    )
}

export default RelatedProducts