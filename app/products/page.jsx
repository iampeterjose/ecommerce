"use client";
import { useEffect } from "react";
import useProductStore from "../store/productStore";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaArrowUpLong } from "react-icons/fa6";


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
            try {
                const result = await fetch('https://dummyjson.com/products/categories');
                const data = await result.json();
                setCategories(data);
            } catch (error) {
                console.log(`Error connecting to server: `,error);
            }
        };

        const fetchProducts = async () => {
            let url = 'https://dummyjson.com/products';
            
            // Use category if selected
            if (selectedCategory) {
                url = `https://dummyjson.com/products/category/${selectedCategory}`;
            }
            
            try {
                const result = await fetch(`${url}?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`);
                const data = await result.json();
                setAllProducts(data.products);
                setTotalProducts(data.total || 0); // Ensure total defaults to 0 if undefined
            } catch (error) {
                console.log(`Error connecting to server: `,error);
            }
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
        <div className="flex flex-col px-3 md:px-5 py-16 md:py-5 gap-y-4 text-slate-700 ">
            <h1 className="text-xl font-semibold">Products</h1>

            <div className="flex flex-col md:flex-row items-center gap-4 border-b border-t border-customBlue py-2">
                <div className="flex gap-4 w-full">
                    <p className="flex items-center gap-2 text-sm font-semibold">Search Option <GiSettingsKnobs size={22} /></p>
                    <p className='flex items-center cursor-pointer'>Name<FaArrowUpLong /></p>
                    <p className='flex items-center cursor-pointer'>Price<FaArrowUpLong /></p>
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); // Reset to page 1 when category changes
                        }}
                        className="border rounded-md p-2 h-14 md:h-fit"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex relative w-full">
                    <input type="search" placeholder="Search products..." 
                        className="block px-2 py-2 pr-[60px] w-full text-base text-slate-700 bg-gray-50 rounded-md border"
                    />
                    <button className="absolute top-0 end-0 px-2 py-1 text-sm font-medium h-full border-l-2 rounded-e-sm">
                        <span>Search</span>
                    </button>
                </div>
            </div>

            <span>
                <p className="text-sm text-slate-500 font-semibold">Result: {allProducts.length} products</p>
            </span>
            <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                {allProducts.length > 0 ? allProducts.map((product) => (
                    <li key={product.id} className="flex flex-col bg-white justify-center items-center p-3 border-2 rounded-lg hover:cursor-pointer">
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col items-center">
                            <img src={product.thumbnail} alt={product.title} className="w-[125px] h-[125px] md:h-[150px]"/> 
                            <div className="border-t border-dashed w-full py-2">
                                <h2 className="text-md font-semibold">{product.title}</h2>
                                <span className="flex justify-between">
                                    <p className="text-sm font-semibold text-slate-500">${product.price}</p>
                                    <FaStar size={22} className="hover:text-yellow-400 text-slate-300" />
                                </span>
                            </div>
                        </Link>
                    </li>
                )) : (
                    <div className="flex fixed flex-col gap-2 px-10 py-4 top-0 w-full h-full bg-slate-50 opacity-70 justify-center items-center">
                        <p className="text-lg font-semibold">Loading</p>
                        <AiOutlineLoading3Quarters size={25} className="animate-spin" />
                    </div>
                )}
            </ul>
            <div className="flex justify-center mt-4 py-10 border-t border-customBlue">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-2 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Page;
