"use client";
import useProductStore from "@/app/store/productStore"
import ProductList from "@/components/ProductList"
import useCustomHooks from "@/app/useCustomHooks";
import SearchOption from "@/components/SearchOption";

const page = () => {
    const { useFeaturedCategories } = useCustomHooks;
    useFeaturedCategories();
    const { newArrivals } = useProductStore();
    return (
        <div className="flex flex-col py-20 md:py-12 gap-y-8 min-h-screen px-2 md:px-16 lg:px-32 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
            <a id="top" className="absolute top-0"></a>
            <h1 className="text-4xl font-extrabold text-emerald-700 tracking-tight mb-6 text-center drop-shadow">New Arrivals</h1>
            <div className="w-full max-w-7xl mx-auto mb-8">
                <SearchOption />
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <ProductList products={newArrivals} />
            </div>
        </div>
    )
}

export default page