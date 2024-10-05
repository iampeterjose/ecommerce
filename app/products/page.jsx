"use client";
import { useEffect, useState } from "react";
import useProductStore from "../store/productStore";
import { FaChevronCircleUp } from "react-icons/fa";
import SearchOption from "@/components/SearchOption";
import ProductList from "@/components/ProductList";
import Loading from "@/components/Loading";
import { CgDanger } from "react-icons/cg";

const Page = () => {
    const {
        allProducts,
        currentPage,
        itemsPerPage,
        selectedCategory,
        totalProducts,
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
        <section className="flex flex-col py-16 md:py-5 gap-y-4 scroll-smooth min-h-screen">
            {/* Anchor at the top for smooth scrolling */}
            <a id="top" className="absolute top-0"></a>
            <h1 className="text-2xl text-customDark font-semibold">Products</h1>

            <SearchOption onSort={handleSortChange} />
            {loading ? (
                <Loading />
            ) : error ? (
                <p className="flex min-h-screen justify-center items-center text-lg font-semibold text-red-500"><CgDanger size={30} />{error}</p>
            ) : (
                <ProductList products={paginatedProducts} />
            )}

            <div className="fixed right-0 mr-3 bottom-10">
                <a href="#top" className="cursor-pointer">
                    <FaChevronCircleUp size={20} />
                </a>
            </div>
            <div className="flex justify-center mt-4 py-10 border-customDark2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-2 py-1 border rounded ${currentPage === index + 1 ? 'bg-softgreen text-white' : 'bg-white text-customDark'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default Page;
