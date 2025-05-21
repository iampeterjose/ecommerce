import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { SiAdguard } from "react-icons/si";
import { TbDimensions } from "react-icons/tb";
import { FaWeight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaTag } from "react-icons/fa6";
import useProductStore from "@/app/store/productStore";
import { motion } from "framer-motion";
import Button from "./Button";

const ProductDetails = () => {
    const { product, count, setCount, setCart } = useProductStore();

    const discount = ((product?.discountPercentage * product?.price) / 100).toFixed(2);
    const discountedPrice = (product?.price - discount).toFixed(2);

    const addToCart = () => {
        if (!product) {
            alert("Product information is not available.");
            return;
        }
        if (count < 1) {
            alert("Please add quantity.");
            return;
        }

        const itemToAdd = { ...product, quantity: count };
        setCart(itemToAdd);
        setCount(0);

        alert(`${product.title} added to cart!`);
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col gap-5 text-emerald-800">
            <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-2 tracking-tight">Product Details</h1>
            <div className="flex items-center gap-4 text-2xl font-bold text-emerald-700 mb-2">
                ${discountedPrice}
                <span className="text-base line-through text-emerald-400 font-semibold">${product?.price}</span>
                <span className="bg-rose-100 text-rose-600 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm ml-2">
                    {product?.discountPercentage.toFixed(0)}% OFF
                </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-1">
                <span className="uppercase tracking-wide text-xs bg-emerald-100 px-2 py-0.5 rounded-full">{product?.brand}</span>
            </div>
            <p className="text-base text-emerald-700 mb-2"><span className="font-semibold">Description:</span> <span className="font-normal">{product?.description}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <p className="flex items-center gap-2 text-sm"><FaWeight size={18} /> <span className="font-semibold">Weight:</span> {product?.weight}</p>
                <p className="flex items-center gap-2 text-sm"><TbDimensions size={18} /> <span className="font-semibold">Dimensions:</span> {product?.dimensions?.width} x {product?.dimensions?.height} x {product?.dimensions?.depth}</p>
                <p className="flex items-center gap-2 text-sm col-span-2"><SiAdguard size={18} /> <span className="font-semibold">Warranty:</span> {product?.warrantyInformation}</p>
                <p className="flex items-center gap-2 text-sm col-span-2"><TbTruckReturn size={18} /> <span className="font-semibold">Return Policy:</span> {product?.returnPolicy}</p>
                <p className="flex items-center gap-2 text-sm col-span-2"><FaShippingFast size={18} /> <span className="font-semibold">Shipping:</span> {product?.shippingInformation}</p>
            </div>
            <div className="py-3 border-t border-dashed border-emerald-100 flex flex-col gap-2">
                <p className="flex items-center gap-2 text-sm"><BiSolidCategory size={18} /> <span className="font-semibold">Category:</span> {product?.category}</p>
                <p className="flex items-center gap-2 text-sm"><FaTag size={18} /> <span className="font-semibold">Tags:</span> {product?.tags?.map((tag, index) => (
                    <span key={index} className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium mr-1">{tag}</span>
                ))}</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <span className="text-base font-semibold text-emerald-700">Quantity:</span>
                <span className="w-[144px]"><Button quantity={0} isInCart={false} /></span>
            </div>
            <motion.button
                onClick={addToCart}
                className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
            >
                Add to Cart
            </motion.button>
        </div>
    );
}

export default ProductDetails;
