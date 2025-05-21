"use client";
import useProductStore from "@/app/store/productStore";
import ProductList from "@/components/ProductList";
import SearchOption from "@/components/SearchOption";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const [products, setProducts] = useState([]);
    const pathname = usePathname();
    const category = pathname.split('/').pop();

    const { setError, setCategories, allProducts, searchTerm, selectedCategory } = useProductStore();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [nameClick, setNameClick] = useState(false);
    const [priceClick, setPriceClick] = useState(false); // Track price sorting state

    // Fetch products for the selected category
    useEffect(() => {
        const fetchAllProducts = async () => {
            const result = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await result.json();
            setProducts(data.products);
        };

        fetchAllProducts();
    }, [category]); // Add category as dependency to refetch if it changes

    // Fetch categories
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

        fetchCategories();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleSortChange = (newNameClick, newPriceClick) => {
        setNameClick(newNameClick);
        setPriceClick(newPriceClick);
    };

    // Filter and sort products whenever products or relevant states change
    useEffect(() => {
        const filterProducts = () => {
            const filtered = products.filter(product => {
                const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
                return matchesSearch && matchesCategory;
            });

            // Sort products based on nameClick and priceClick
            const sorted = filtered.sort((a, b) => {
                if (priceClick) {
                    return priceClick === 'asc' ? a.price - b.price : b.price - a.price; // Sort by price
                }
                return nameClick 
                    ? b.title.localeCompare(a.title) // Z-A
                    : a.title.localeCompare(b.title); // A-Z
            });

            setFilteredProducts(sorted);
        };

        filterProducts();
    }, [products, searchTerm, selectedCategory, nameClick, priceClick]); // Ensure products are a dependency

    console.log(filteredProducts);

    return (
        <div className="flex flex-col py-20 md:py-12 gap-y-8 min-h-screen px-2 md:px-16 lg:px-32 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
            <a id="top" className="absolute top-0"></a>
            <h1 className="text-4xl font-extrabold text-emerald-700 tracking-tight mb-6 text-center drop-shadow">{capitalizeFirstLetter(category)}</h1>
            <div className="w-full max-w-7xl mx-auto mb-8">
                <SearchOption onSort={handleSortChange} />
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
};

export default Page;
