import useProductStore from "@/app/store/productStore";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Loading from "./Loading";

const ProductList = () => {
    const { allProducts } = useProductStore();

    return (
        <>
        <span>
            <p className="text-sm text-slate-500 font-semibold">Result: {allProducts.length} products</p>
        </span>
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
            {allProducts.length > 0 ? allProducts.map((product) => (
                <li key={product.id} className="flex flex-col bg-white px-3 border-2 rounded-lg hover:cursor-pointer">
                    <Link href={`/product/${product.id}`} className="w-full flex flex-col hover:text-blue-500">
                        <div className="flex justify-center w-full py-2">
                            <img src={product.thumbnail} alt={product.title} className="w-[175px] h-[125px] md:h-[175px]"/>
                        </div> 
                        <span className="border-t-2 border-dashed w-full py-1"></span>
                        <div>
                            <h2 className="text-md font-semibold">{product.title}</h2>
                        </div>
                    </Link>
                    <span className="flex justify-between mb-2">
                        <p className="text-sm font-semibold text-slate-500">${product.price}</p>
                        <FaStar size={22} className="hover:text-yellow-400 text-slate-300" />
                    </span>
                </li>
            )) : (
                <Loading />
            )}
        </ul>
        </>
    )
}

export default ProductList