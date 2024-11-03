import { useEffect } from "react";
import useProductStore from "../store/productStore";

const useFeaturedCategories = () => {
    const { setNewArrivals, setError, setLoading, setBestSellers, setExclusiveOffers, setEssentials } = useProductStore();

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true); // Start loading
                const result = await fetch(`https://dummyjson.com/products?limit=28`);
                const data = await result.json();

                const startDate = new Date("2024-05-23");
                const currentDate = new Date();

                // Filter products based on createdAt date
                const filteredProducts = data.products.filter(product => {
                    const createdAt = new Date(product.meta.createdAt);
                    return createdAt >= startDate && createdAt <= currentDate;
                });

                const bestSellers = data.products.filter(product => product.rating >= 4);
                const exclusiveOffers = data.products.filter(product => product.discountPercentage >= 18);
                const essentials = data.products.filter(product => product.category === "groceries");

                setNewArrivals(filteredProducts);
                setBestSellers(bestSellers);
                setExclusiveOffers(exclusiveOffers);
                setEssentials(essentials);
            } catch (error) {
                console.error(`Error connecting to server:`, error);
                setError('Failed to load content');
            } finally {
                setLoading(false);  
            }
        };

        fetchAllProducts();
    }, [setNewArrivals, setError, setLoading, setBestSellers, setExclusiveOffers, setEssentials]);
};

const useFilterProducts = ({ nameClick, priceClick }) => {
    const {
        allProducts,
        selectedCategory,
        searchTerm,
        setFilteredProducts,
    } = useProductStore();

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
}

const useCustomHooks = { useFeaturedCategories, useFilterProducts };
export default useCustomHooks;
