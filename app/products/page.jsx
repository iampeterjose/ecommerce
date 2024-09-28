"use client";
import { useEffect } from "react";
import useProductStore from "../store/productStore";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import { IoPricetagsOutline } from "react-icons/io5";

const Page = () => {
    const {
        allProducts = [],
        categories,
        currentPage,
        itemsPerPage,
        selectedCategory,
        totalProducts,
        setAllProducts,
        setCategories,
        setCurrentPage,
        setSelectedCategory,
        setTotalProducts
    } = useProductStore();

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await fetch('https://dummyjson.com/products/categories');
            const data = await result.json();
            setCategories(data);
        };

        const fetchProducts = async () => {
            let url = 'https://dummyjson.com/products';
            
            // Use category if selected
            if (selectedCategory) {
                url = `https://dummyjson.com/products/category/${selectedCategory}`;
            }
            
            const result = await fetch(`${url}?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`);
            const data = await result.json();
            setAllProducts(data.products);
            setTotalProducts(data.total || 0); // Ensure total defaults to 0 if undefined
        };

        fetchCategories();
        fetchProducts();
    }, [currentPage, itemsPerPage, selectedCategory, setAllProducts, setCategories, setTotalProducts]);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top
    };

    return (
        <div className="flex flex-col px-2 md:px-5 py-16 md:py-5 gap-y-4">
            <h1 className="text-xl text-slate-700 font-semibold">Products</h1>

            <form className="flex border w-full md:w-fit rounded-sm my-4">
                <div className="h-14 md:h-auto">
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); // Reset to page 1 when category changes
                        }}
                        className="border rounded-s-sm px-3 py-2 h-full"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex relative">
                    <input type="search" placeholder="Search products..." 
                        className="block px-2 py-1 pr-[60px] text-base w-full md:w-[300px] text-slate-700 bg-gray-50 rounded-e-sm border"
                    />
                    <button className="absolute top-0 end-0 px-2 py-1 text-sm font-medium h-full border-l-2 rounded-e-sm">
                        <span>Search</span>
                    </button>
                </div>
            </form>

            <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-6 gap-y-20">
                {allProducts.length > 0 ? allProducts.map((product) => (
                    <li key={product.id} className="flex flex-col justify-center items-center pb-2 border-2 rounded-sm hover:cursor-pointer relative hover:bg-slate-200 bg-slate-100 group">
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-center border-b hover:bg-slate-50 bg-white">
                                <img src={product.thumbnail} alt={product.title} className="w-[180px] md:w-[200px] h-[180px] md:h-[250px]"/> 
                            </div>
                            <StarRating rating={product.rating} />
                            <h2 className="text-sm items-center">{product.title}</h2>
                            <p className="text-sm text-red-500">${product.price}</p>
                        </Link>
                    </li>
                )) : (
                    <p>Loading...</p>
                )}
            </ul>
            <div className="flex justify-center my-20">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 p-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Page;
