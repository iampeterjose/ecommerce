"use client";
import { useEffect } from "react";
import useProductStore from "../store/productStore";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaChevronCircleUp } from "react-icons/fa";


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
        <section className="flex flex-col py-16 md:py-5 gap-y-4 text-slate-700 scroll-smooth">
            {/* Anchor at the top for smooth scrolling */}
            <a id="top" className="absolute top-0"></a>

            <h1 className="text-xl font-semibold">Products</h1>

            <div className="flex flex-col md:flex-row gap-y-2 items-center border-b border-t border-customBlue py-2">
                <div className="flex w-full gap-4 md:gap-10">
                    <span className="flex items-center gap-2">
                        <p className="font-semibold">Search Option </p>
                        <GiSettingsKnobs size={22} />
                    </span>
                    <p className='flex items-center cursor-pointer'>Name<FaArrowUpLong /></p>
                    <p className='flex items-center cursor-pointer'>Price<FaArrowUpLong /></p>
                </div>
                <div className="flex w-full">
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); // Reset to page 1 when category changes
                        }}
                        className="border rounded-md px-2 py-1"
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
                        className="block px-2 py-1 pr-[60px] w-full text-base text-slate-700 bg-gray-50 rounded-md border"
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
                    <li key={product.id} className="flex flex-col bg-white px-3 border-2 rounded-lg hover:cursor-pointer">
                        <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                            <div className="flex justify-center w-full py-2">
                                <img src={product.thumbnail} alt={product.title} className="w-[175px] h-[125px] md:h-[175px]"/>
                            </div> 
                            <div className="border-t-2 border-dashed w-full py-1">
                                <h2 className="text-md font-semibold">{product.title}</h2>
                            </div>
                        </Link>
                        <span className="flex justify-between mb-2">
                            <p className="text-sm font-semibold text-slate-500">${product.price}</p>
                            <FaStar size={22} className="hover:text-yellow-400 text-slate-300" />
                        </span>
                    </li>
                )) : (
                    <div className="flex fixed flex-col gap-2 px-10 py-4 top-0 w-full h-full bg-slate-50 opacity-70 justify-center items-center">
                        <p className="text-lg font-semibold">Loading</p>
                        <AiOutlineLoading3Quarters size={25} className="animate-spin" />
                    </div>
                )}
            </ul>
            <div className="fixed right-0 mr-3 bottom-10">
                {/* Updated link to point to the anchor */}
                <a href="#top" className="cursor-pointer">
                    <FaChevronCircleUp size={20} />
                </a>
            </div>
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
        </section>
    );
};

export default Page;
