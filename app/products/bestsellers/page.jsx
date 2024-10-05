"use client";
import useProductStore from "@/app/store/productStore"
import ProductList from "@/components/ProductList"

const page = () => {
  const { bestSellers } = useProductStore();

  return (
    <div className="flex flex-col py-16 md:py-5 gap-y-4 min-h-screen">
      <a id="top" className="absolute top-0"></a>
      <h1 className="text-2xl text-customDark font-semibold">Best Sellers</h1>

      <ProductList products={bestSellers} />
    </div>
  )
}

export default page