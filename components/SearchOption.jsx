"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaArrowUpLong } from "react-icons/fa6";
import useProductStore from "@/app/store/productStore";
import { useState } from "react";

const SearchOption = ({ onSort }) => {
    const { categories, selectedCategory, setSelectedCategory, setCurrentPage, isOpen, setSearchTerm, searchTerm } = useProductStore();
    const [nameClick, setNameClick] = useState(false);
    const [priceClick, setPriceClick] = useState(false);

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

    return (
        <div className={`flex flex-col ${isOpen ? "md:flex-col lg:flex-row" : "md:flex-row"} gap-y-2 items-center bg-customDark text-white p-2 rounded-t-md`}>
            <div className="flex w-full gap-4 md:gap-10">
                <span className="flex items-center gap-2">
                    <p className="font-semibold">Search Option </p>
                    <GiSettingsKnobs size={22} />
                </span>
                <p className='flex items-center cursor-pointer' onClick={handleNameClick}>Name<FaArrowUpLong className={`${nameClick && "rotate-180"}`} /></p>
                <p className='flex items-center cursor-pointer' onClick={handlePriceClick}>Price<FaArrowUpLong className={`${priceClick && "rotate-180"}`} /></p>
            </div>
            <div className="flex w-full">
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1); // Reset to page 1 when category changes
                    }}
                    className="border w-full md:w-fit rounded-md px-2 py-1 text-customDark"
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
                <input
                    type="search"
                    placeholder="Search products..."
                    onChange={(e) => {
                        setSearchTerm(e.target.value); // Update search term in Zustand
                    }}
                    className="block px-2 py-1 pr-[60px] w-full text-base text-customDark bg-gray-50 rounded-md border"
                    value={searchTerm}
                />
                <button className="absolute top-0 end-0 px-2 py-1 text-sm font-medium text-customDark h-full border-l-2 rounded-e-sm">
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
};

export default SearchOption;
