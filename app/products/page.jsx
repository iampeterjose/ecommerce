"use client";
import { useEffect } from "react";
import useProductStore from "../store/productStore";
import { FaChevronCircleUp } from "react-icons/fa";
import SearchOption from "@/components/SearchOption";
import ProductList from "@/components/ProductList";


const Page = () => {
    const {
        currentPage,
        itemsPerPage,
        selectedCategory,
        totalProducts,
        setAllProducts,
        setCategories,
        setCurrentPage,
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

            <SearchOption />
            <ProductList />

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
                        className={`mx-1 px-2 py-1 border rounded ${currentPage === index + 1 ? 'bg-softgreen text-white' : 'bg-white text-slate-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Page;
