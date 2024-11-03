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
        if (selectedSlug) {
            router.push(`/products/category/${selectedSlug}`); // Navigate to the selected category
        }
        else{
            router.push(`/products`)
        }
    };

    const handleFeaturedCategories = (e) => {
        const selected = e.target.value;
        setSelectedFeaturedCategory(selected);
        router.push(`/products/${selected}`);
    }

    return (
        <div className={`flex flex-col md:flex-row gap-y-2 items-center bg-lightBg text-customBlue2 border p-2 rounded-t-md`}>
            <div className="flex w-full gap-4 md:gap-10">
                <span className="flex items-center gap-2">
                    <p className="font-semibold">Search Option </p>
                    <GiSettingsKnobs />
                </span>
                <p className='flex items-center cursor-pointer' onClick={handleNameClick}>Name<FaArrowUpLong size={14} className={`${nameClick && "rotate-180"}`} /></p>
                <p className='flex items-center cursor-pointer' onClick={handlePriceClick}>Price<FaArrowUpLong size={14} className={`${priceClick && "rotate-180"}`} /></p>
            </div>
            <div className="flex gap-2 w-full">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange} // Use the new handler
                    className="border w-full md:w-fit rounded-md p-2 text-customBlue2"
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
                    onChange={handleFeaturedCategories} // Use the new handler
                    className="border w-full md:w-fit rounded-md p-2 text-customBlue2"
                >
                    <option value="">Featured Category</option>
                    {featuredCategories.map((featured, index) => (
                        <option key={index} value={featured.slug}>
                            {featured.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex relative w-full">
                <input
                    type="search"
                    placeholder="Search products..."
                    onChange={(e) => {
                        setSearchTerm(e.target.value); // Update search term in Zustand
                    }}
                    className="block p-2 pr-[60px] w-full text-base text-customBlue2 bg-gray-50 rounded-md border"
                    value={searchTerm}
                />
                <button className="absolute top-0 end-0 px-2 py-1 text-sm font-medium text-customBlue2 h-full border-l-2 rounded-e-sm">
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchOption;
