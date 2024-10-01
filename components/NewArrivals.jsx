"use client";
import useProductStore from "@/app/store/productStore";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const NewArrivals = () => {
    const { newArrivals, setNewArrivals } = useProductStore();
    const [displayCount, setDisplayCount] = useState(5);
    
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
                {newArrivals.total > 6 && (
                    <span className="text-xs md:text-sm font-semibold text-blue-500 cursor-pointer" onClick={()=>setDisplayCount(newArrivals.total)}>Show all</span>
                )}
            </div>
            <ul className="flex w-full overflow-x-auto whitespace-nowrap flex-row justify-between items-center absolute left-0 s px-2 py-4 md:px-24 gap-2 md:gap-6 text-md md:font-xl font-semibold text-slate-700 bg-white">
                {newArrivals.total > 0 ? newArrivals.products.slice(0,displayCount).map((product) => (
                    <li key={product.id} className="flex flex-col min-w-36 md:min-w-64 bg-white px-3 border-2 rounded-sm hover:cursor-pointer">
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                            <div className="flex justify-center w-full py-2">
                                <img src={product.thumbnail} alt={product.title} className="w-[100px] md:w-[125px] h-[100px] md:h-[125px]"/>
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
                    <Loading />
                )}
            </ul>
        </div>
    )
}

export default NewArrivals