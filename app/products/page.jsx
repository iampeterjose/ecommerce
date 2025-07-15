"use client";
import { useEffect, useState } from "react";
import useProductStore from "../store/productStore";
import { FaChevronCircleUp } from "react-icons/fa";
import SearchOption from "@/components/SearchOption";
import ProductList from "@/components/ProductList";
import { CgDanger } from "react-icons/cg";
import ProductListSkeleton from "@/components/ProductListSkeleton";

const Page = () => {
    const {
        allProducts,
        currentPage,
        itemsPerPage,
        selectedCategory,
        setAllProducts,
        setCategories,
        setCurrentPage,
        setTotalProducts,
        loading,
        setLoading,
        error,
        setError,
        searchTerm,
    } = useProductStore();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [nameClick, setNameClick] = useState(false);
    const [priceClick, setPriceClick] = useState(false); // Track price sorting state

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetch('https://dummyjson.com/products/categories');
                const data = await result.json();
                setCategories(data);
            } catch (error) {
                console.log(`Error connecting to server: `, error);
                setError("Failed to load products.");
            }
        };

        const fetchProducts = async () => {
            setLoading(true); // Set loading before fetching
            let url = 'https://dummyjson.com/products';

            if (selectedCategory) {
                url = `https://dummyjson.com/products/category/${selectedCategory}`;
            }

            try {
                const allProducts = [];
                let hasMoreProducts = true;
                let page = 1; // Initialize page

                while (hasMoreProducts) {
                    const result = await fetch(`${url}?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`);
                    const data = await result.json();
                    allProducts.push(...data.products);
                    hasMoreProducts = data.products.length === itemsPerPage; // Check if more products are available
                    page++;
                }

                setAllProducts(allProducts);
                setTotalProducts(allProducts.length); // Set total products
            } catch (error) {
                console.log(`Error connecting to server: `, error);
                setError(`Failed to load ${selectedCategory} products.`);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchProducts();
    }, [currentPage, itemsPerPage, selectedCategory, setAllProducts, setCategories, setTotalProducts, setLoading, setError]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Use filteredProducts.length
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top
    };

    const handleSortChange = (newNameClick, newPriceClick) => {
        setNameClick(newNameClick);
        setPriceClick(newPriceClick);
    };

    useEffect(() => {
        const filterProducts = () => {
            const filtered = allProducts.filter(product => {
                const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
                return matchesSearch && matchesCategory;
            });

            // Sort products based on nameClick and priceClick
            const sorted = filtered.sort((a, b) => {
                if (priceClick) {
                    return priceClick ? a.price - b.price : b.price - a.price; // Sort by price
                }
                return nameClick 
                    ? b.title.localeCompare(a.title) // Z-A
                    : a.title.localeCompare(b.title); // A-Z
            });

            setFilteredProducts(sorted);
        };

        filterProducts();
    }, [allProducts, searchTerm, selectedCategory, nameClick, priceClick]);

    return (
        <section className="flex flex-col py-20 md:py-12 gap-y-8 min-h-screen px-2 md:px-16 lg:px-32 bg-[#F5F5F5]">
            <a id="top" className="absolute top-0"></a>
            <h1 className="text-4xl font-extrabold text-[#1976D2] tracking-tight mb-6 text-center drop-shadow">All Products</h1>
            <div className="w-full max-w-7xl mx-auto mb-8">
                <SearchOption onSort={handleSortChange} />
            </div>
            {loading ? (
                <ProductListSkeleton productsCount={itemsPerPage} />
            ) : error ? (
                <p className="flex min-h-[200px] justify-center items-center text-lg font-semibold text-[#E53935]"><CgDanger size={30} className="mr-2" />{error}</p>
            ) : (
                <div className="w-full max-w-7xl mx-auto">
                    <ProductList products={paginatedProducts} />
                </div>
            )}
            {/* Pagination & Scroll to Top */}
            <div className="flex flex-col items-center gap-2 mt-8">
                <div className="fixed right-0 mr-4 bottom-10 z-30">
                    <a href="#top" className="cursor-pointer p-2 opacity-70 hover:opacity-100 transition-opacity">
                        <FaChevronCircleUp size={28} className="text-[#1976D2]" />
                    </a>
                </div>
                <div className="flex justify-center mt-2 py-6 gap-1">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full border-2 font-semibold transition-colors duration-150 text-sm md:text-base
                                ${currentPage === index + 1 ? 'bg-[#1976D2] text-white border-[#1976D2] shadow' : 'bg-white text-[#1976D2] border-[#1976D2]/30 hover:bg-[#FF6F00]/10'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Page;
