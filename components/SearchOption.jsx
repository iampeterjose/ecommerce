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
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full bg-[#F5F5F5] border border-[#1976D2]/20 p-4 rounded-xl shadow mb-4">
            {/* Sort & Filter Controls */}
            <div className="flex flex-wrap gap-3 md:gap-6 items-center w-full md:w-auto">
                <span className="flex items-center gap-2 font-semibold text-[#1976D2]">
                    <GiSettingsKnobs />
                    <span>Options</span>
                </span>
                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 text-xs md:text-sm font-semibold transition-colors duration-150
                        ${nameClick ? 'bg-[#1976D2] text-white border-[#1976D2] shadow' : 'bg-white text-[#1976D2] border-[#1976D2]/30 hover:bg-[#FF6F00]/10'}`}
                    onClick={handleNameClick}
                >
                    Name <FaArrowUpLong size={14} className={`${nameClick ? 'rotate-180' : ''}`} />
                </button>
                <button
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border-2 text-xs md:text-sm font-semibold transition-colors duration-150
                        ${priceClick ? 'bg-[#1976D2] text-white border-[#1976D2] shadow' : 'bg-white text-[#1976D2] border-[#1976D2]/30 hover:bg-[#FF6F00]/10'}`}
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
                    className="border-2 border-[#1976D2]/30 rounded-md p-2 text-[#1976D2] bg-white focus:outline-[#1976D2] w-full md:w-auto text-xs md:text-sm"
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
                    className="border-2 border-[#1976D2]/30 rounded-md p-2 text-[#1976D2] bg-white focus:outline-[#1976D2] w-full md:w-auto text-xs md:text-sm"
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
                    className="block p-2 pr-[60px] w-full text-xs md:text-base text-[#1976D2] bg-white rounded-md border-2 border-[#1976D2]/30 focus:outline-[#1976D2]"
                    value={searchTerm}
                />
                <button className="absolute top-0 right-0 px-3 py-1 text-xs md:text-sm font-semibold text-white bg-[#FF6F00] h-full rounded-e-md hover:bg-[#1976D2] transition-colors">
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchOption;
