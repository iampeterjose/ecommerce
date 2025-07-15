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
import { toast } from "react-hot-toast";

// In your root layout (e.g., app/layout.js):
// import { Toaster } from 'react-hot-toast';
// <Toaster position="top-center" />

const ProductDetails = () => {
    const { product, count, setCount, setCart } = useProductStore();

    const discount = ((product?.discountPercentage * product?.price) / 100).toFixed(2);
    const discountedPrice = (product?.price - discount).toFixed(2);

    const addToCart = () => {
        if (!product) {
            toast.error("Product information is not available.", {
                style: {
                    borderRadius: '16px',
                    background: '#fff1f2',
                    color: '#be123c',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    boxShadow: '0 6px 32px 0 #be123c33',
                    padding: '1.25rem 2rem',
                    minWidth: '340px',
                    textAlign: 'center',
                    marginTop: '70px',
                },
                icon: '❌',
                iconTheme: {
                    primary: '#be123c',
                    secondary: '#fff1f2',
                },
            });
            return;
        }
        if (count < 1) {
            toast.error("Please add quantity.", {
                style: {
                    borderRadius: '16px',
                    background: '#fff1f2',
                    color: '#be123c',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    boxShadow: '0 6px 32px 0 #be123c33',
                    padding: '1.25rem 2rem',
                    minWidth: '340px',
                    textAlign: 'center',
                    marginTop: '70px',
                },
                icon: '⚠️',
                iconTheme: {
                    primary: '#be123c',
                    secondary: '#fff1f2',
                },
            });
            return;
        }

        const itemToAdd = { ...product, quantity: count };
        setCart(itemToAdd);
        setCount(0);

        toast.success(`${product.title} added to cart!`, {
            style: {
                borderRadius: '16px',
                background: '#10b981',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                boxShadow: '0 6px 32px 0 #05966944',
                padding: '1.25rem 2rem',
                minWidth: '340px',
                textAlign: 'center',
                marginTop: '70px',
            },
            icon: '🛒',
            iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
            },
        });
    };

    return (
        <div className="w-full max-w-xl mx-auto rounded-3xl p-6 md:p-10 flex flex-col gap-6 text-[#1976D2] border border-[#1976D2]/20">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1976D2] mb-2 tracking-tight flex items-center gap-2">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-[#FF6F00]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Product Details
            </h1>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-[#1976D2] mb-2">
                ${discountedPrice}
                <span className="text-base line-through text-[#E53935] font-semibold">${product?.price}</span>
                <span className="bg-[#E53935]/10 text-[#E53935] text-xs px-2 py-0.5 rounded-full font-bold shadow-sm ml-2">
                    {product?.discountPercentage.toFixed(0)}% OFF
                </span>
            </div>
            <div className="flex items-center gap-2 text-[#1976D2] font-semibold mb-1">
                <span className="uppercase tracking-wide text-xs bg-[#1976D2]/10 px-2 py-0.5 rounded-full">{product?.brand}</span>
            </div>
            <p className="text-sm md:text-base text-[#424242] mb-2 leading-relaxed"><span className="font-semibold">Description:</span> <span className="font-normal">{product?.description}</span></p>
            {/* Product Info Grid - context-aware */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                {product?.weight && (
                    <p className="flex items-center gap-2 text-xs md:text-sm"><FaWeight size={18} /> <span className="font-semibold">Weight:</span> {product.weight}</p>
                )}
                {product?.dimensions && (
                    <p className="flex items-center gap-2 text-xs md:text-sm"><TbDimensions size={18} /> <span className="font-semibold">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</p>
                )}
                {product?.warrantyInformation && (
                    <p className="flex items-center gap-2 text-xs md:text-sm col-span-2"><SiAdguard size={18} /> <span className="font-semibold">Warranty:</span> {product.warrantyInformation}</p>
                )}
                {product?.returnPolicy && (
                    <p className="flex items-center gap-2 text-xs md:text-sm col-span-2"><TbTruckReturn size={18} /> <span className="font-semibold">Return Policy:</span> {product.returnPolicy}</p>
                )}
                {product?.shippingInformation && (
                    <p className="flex items-center gap-2 text-xs md:text-sm col-span-2"><FaShippingFast size={18} /> <span className="font-semibold">Shipping:</span> {product.shippingInformation}</p>
                )}
            </div>
            <div className="py-3 border-t border-dashed border-[#1976D2]/20 flex flex-col gap-2">
                <p className="flex items-center gap-2 text-xs md:text-sm"><BiSolidCategory size={18} /> <span className="font-semibold">Category:</span> <span className="bg-[#1976D2]/10 text-[#1976D2] px-2 py-0.5 rounded-full text-xs font-medium">{product?.category}</span></p>
                <p className="flex items-center gap-2 text-xs md:text-sm"><FaTag size={18} /> <span className="font-semibold">Tags:</span> {product?.tags?.length > 0 ? product.tags.map((tag, index) => (
                    <span key={index} className="bg-[#1976D2]/10 text-[#1976D2] px-2 py-0.5 rounded-full text-xs font-medium mr-1">{tag}</span>
                )) : <span className="text-[#E3E3E3]">No tags</span>}</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <span className="text-xs md:text-base font-semibold text-[#1976D2]">Quantity:</span>
                <span className="w-[144px]"><Button quantity={0} isInCart={false} /></span>
            </div>
            <motion.button
                onClick={addToCart}
                className="mt-2 bg-[#FF6F00] hover:bg-[#1976D2] text-white font-extrabold py-3 px-8 rounded-2xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-base md:text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-[#1976D2]/40"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
            >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" /><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /></svg>
                Add to Cart
            </motion.button>
        </div>
    );
}

export default ProductDetails;
