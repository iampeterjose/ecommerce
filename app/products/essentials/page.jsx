"use client";
import useProductStore from "@/app/store/productStore"
import ProductList from "@/components/ProductList"
import useCustomHooks from "@/app/useCustomHooks";
import SearchOption from "@/components/SearchOption";

const page = () => {
    const { useFeaturedCategories } = useCustomHooks;
    useFeaturedCategories();
    const { essentials } = useProductStore();

    return (
        <div className="flex flex-col py-20 md:py-12 gap-y-8 min-h-screen px-2 md:px-16 lg:px-32 bg-[#F5F5F5]">
            <a id="top" className="absolute top-0"></a>
            <h1 className="text-4xl font-extrabold text-[#1976D2] tracking-tight mb-6 text-center drop-shadow">Essentials</h1>
            <div className="w-full max-w-7xl mx-auto mb-8">
                <SearchOption />
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <ProductList products={essentials} />
            </div>
        </div>
    )
}

export default page