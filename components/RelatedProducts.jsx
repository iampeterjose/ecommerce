import useProductStore from "@/app/store/productStore";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Loading from "./Loading";

const RelatedProducts = () => {
    const { product, relatedProducts, setRelatedProducts } = useProductStore();

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

    return (
        <div className="border-t border-b border-customBlue py-2">
            <h1 className="text-xl font-semibold">
                Related Products
            </h1>
            <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 my-3">
                {relatedProducts.total > 0 ? relatedProducts.products.slice(0,5).map((product) => (
                    <li key={product.id} className="flex flex-col bg-white px-3 border-2 rounded-sm hover:cursor-pointer">
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                            <div className="flex justify-center w-full py-2">
                                <img src={product.thumbnail} alt={product.title} className="w-[125px] md:w-[175px] h-[125px] md:h-[175px]"/>
                            </div> 
                            <span className="border-t-2 border-dashed w-full py-1"></span>
                            <div>
                                <h2 className="text-sm md:text-md font-semibold">{product.title}</h2>
                            </div>
                        </Link>
                        <span className="flex justify-between mb-2">
                            <p className="text-sm font-semibold text-slate-500">${product.price}</p>
                            <FaStar size={22} className="hover:text-yellow-400 text-slate-300" />
                        </span>
                    </li>
                )) : (
                    <Loading />
                )}
            </ul>
        </div>
    )
}

export default RelatedProducts