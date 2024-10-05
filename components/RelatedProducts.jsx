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
        <div className="border-t border-b border-customDark2 py-2 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold mb-2">
                    Related Products
                </h1>
                {relatedProducts.total > 6 && (
                    <span className="text-xs md:text-sm font-semibold text-blue-500 cursor-pointer" onClick={()=>setDisplayCount(relatedProducts.total)}>Show all</span>
                )}
            </div>
            <ul className={`grid lg:grid-cols-5 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-3 lg:gap-2`}>
                {relatedProducts.total > 0 ? relatedProducts.products.slice(0,displayCount).map((product) => (
                    <motion.li 
                        key={product.id} 
                        className={`flex flex-col bg-white px-3 border-2 rounded-lg hover:cursor-pointer`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                            <div className="flex justify-center w-full py-2">
                                <img src={product.thumbnail} alt={product.title} className={`w-[100px] h-[100px] ${isOpen ? "w-[100px] h-[100px]" : "md:w-[125px] md:h-[125px]"} `}/>
                            </div> 
                            <span className="border-t border-customDark2 border-dashed w-full py-1"></span>
                            <div>
                                <h2 className="text-sm md:text-md font-semibold">{truncateText(product.title, 10)}</h2>
                            </div>
                        </Link>
                        <span className="flex justify-between mb-2">
                        <p className="text-xs md:text-sm font-semibold text-red-700">${(product.price-(product.discountPercentage*product.price)/100).toFixed(2)} <span className="text-customDark2 line-through">{product.price}</span></p>
                            <FaStar size={20} className="hover:text-yellow-400 text-slate-300" />
                        </span>
                    </motion.li>
                )) : (
                    <p className="text-slate-700 font-semibold">No related products found.</p>
                )}
            </ul>
        </div>
    )
}

export default RelatedProducts