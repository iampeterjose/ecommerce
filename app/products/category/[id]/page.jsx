"use client";
import ProductList from "@/components/ProductList";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
    const [products, setProducts] = useState([]);
    const pathname = usePathname();
    const category = pathname.split('/').pop();

    useEffect(() => {
        const fetchAllProducts = async() => {
            const result = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await result.json();

            setProducts(data.products);
        };

        fetchAllProducts();
    },[]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    console.log(products);

    return (
        <div className="flex flex-col py-16 md:py-5 gap-y-4 min-h-screen">
            <a id="top" className="absolute top-0"></a>
            <h1 className="text-2xl text-customDark font-semibold">{capitalizeFirstLetter(category)}</h1>

            <ProductList products={products} />
        </div>
    )
}

export default page