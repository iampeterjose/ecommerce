import { GiSettingsKnobs } from "react-icons/gi";
import { FaArrowUpLong } from "react-icons/fa6";
import useProductStore from "@/app/store/productStore";

const SearchOption = () => {
    const { categories, selectedCategory, setSelectedCategory, setCurrentPage, isOpen } = useProductStore();

    return (
        <div className={`flex flex-col ${isOpen ? "md:flex-col lg:flex-row" : "md:flex-row"} gap-y-2 items-center border-b border-t border-customBlue py-2`}>
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
                    className="border w-full md:w-fit rounded-md px-2 py-1"
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
    )
}

export default SearchOption