"use client";
import useProductStore from "@/app/store/productStore";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const NewArrivals = () => {
    const { newArrivals, setNewArrivals, isOpen } = useProductStore();
    const [displayCount, setDisplayCount] = useState(12);
    
    useEffect(() => {
        const fetchAllProducts =async()=> {
            try {
                const result = await fetch(`https://dummyjson.com/products?limit=30&sort=createdAt`);
                const data = await result.json();
                setNewArrivals(data);
            } catch (error) {
                console.log(`Error connecting to server:`, error);
            }
        };

        fetchAllProducts();
    },[]);

    const truncateText = (text, limit) => {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    console.log(`New Arrivals: `,newArrivals);

    return (

        <div className="border-t border-customBlue py-2 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg text-softgreen font-semibold mb-2">
                    New Arrivals
                </h1>
                {newArrivals.total > 12 && (
                    <span className="text-xs md:text-sm font-semibold text-blue-500 cursor-pointer" onClick={()=>setDisplayCount(newArrivals.total)}>Show all</span>
                )}
            </div>
            <ul className={`grid lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-3 lg:gap-2`}>
                {newArrivals.total > 0 ? newArrivals.products.slice(0,displayCount).map((product) => (
                    <li key={product.id} className={`flex flex-col bg-white px-3 border-2 rounded-lg hover:cursor-pointer`}>
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
                    </li>
                )) : (
                    ''
                )}
            </ul>
        </div>
    )
}

export default NewArrivals