"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaArrowUpLong } from "react-icons/fa6";
import useProductStore from "@/app/store/productStore";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter

const SearchOption = ({ onSort }) => {
    const { categories, selectedCategory, setSelectedCategory, selectedFeaturedCategory, setSelectedFeaturedCategory, setCurrentPage, isOpen, setSearchTerm, searchTerm } = useProductStore();
    const [nameClick, setNameClick] = useState(false);
    const [priceClick, setPriceClick] = useState(false);
    const router = useRouter(); // Initialize router

    const featuredCategories = [
        {title: "Best Sellers", slug: "bestsellers"},
        {title: "New Arrivals", slug: "newarrivals"},
        {title: "Exclusive Offers", slug: "exclusiveoffers"},
        {title: "Essentials", slug: "essentials"},
    ];

    const handleNameClick = () => {
        const newNameClick = !nameClick;
        setNameClick(newNameClick);
        onSort(newNameClick, priceClick); // Pass both sorting states
    };

    const handlePriceClick = () => {
        const newPriceClick = !priceClick;
        setPriceClick(newPriceClick);
        onSort(nameClick, newPriceClick); // Pass both sorting states
    };

    const handleCategoryChange = (e) => {
        const selectedSlug = e.target.value;
        setSelectedCategory(selectedSlug);
        setCurrentPage(1); // Reset to page 1 when category changes
        setSelectedFeaturedCategory(""); // Reset featured category when category is selected
        if (selectedSlug) {
            router.push(`/products/category/${selectedSlug}`); // Navigate to the selected category
        } else {
            router.push(`/products`)
        }
    };

    const handleFeaturedCategories = (e) => {
        const selected = e.target.value;
        setSelectedFeaturedCategory(selected);
        setSelectedCategory(""); // Reset category when featured category is selected
        router.push(`/products/${selected}`);
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full bg-emerald-50 border border-emerald-200 p-4 rounded-xl shadow mb-4">
            {/* Sort & Filter Controls */}
            <div className="flex flex-wrap gap-3 md:gap-6 items-center w-full md:w-auto">
                <span className="flex items-center gap-2 font-semibold text-emerald-700">
                    <GiSettingsKnobs />
                    <span>Options</span>
                </span>
                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 text-sm font-semibold transition-colors duration-150
                        ${nameClick ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
                    onClick={handleNameClick}
                >
                    Name <FaArrowUpLong size={14} className={`${nameClick ? 'rotate-180' : ''}`} />
                </button>
                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 text-sm font-semibold transition-colors duration-150
                        ${priceClick ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
                    onClick={handlePriceClick}
                >
                    Price <FaArrowUpLong size={14} className={`${priceClick ? 'rotate-180' : ''}`} />
                </button>
            </div>
            {/* Category Selectors */}
            <div className="flex gap-2 w-full md:w-auto">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border-2 border-emerald-200 rounded-md p-2 text-emerald-700 bg-white focus:outline-emerald-500 w-full md:w-auto"
                >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedFeaturedCategory}
                    onChange={handleFeaturedCategories}
                    className="border-2 border-emerald-200 rounded-md p-2 text-emerald-700 bg-white focus:outline-emerald-500 w-full md:w-auto"
                >
                    <option value="">Featured Category</option>
                    {featuredCategories.map((featured, index) => (
                        <option key={index} value={featured.slug}>
                            {featured.title}
                        </option>
                    ))}
                </select>
            </div>
            {/* Search Bar */}
            <div className="flex relative w-full md:w-80">
                <input
                    type="search"
                    placeholder="Search products..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block p-2 pr-[60px] w-full text-base text-emerald-700 bg-white rounded-md border-2 border-emerald-200 focus:outline-emerald-500"
                    value={searchTerm}
                />
                <button className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold text-white bg-emerald-600 h-full rounded-e-md hover:bg-emerald-700 transition-colors">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchOption;
