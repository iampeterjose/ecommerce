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
        <div className="py-4 md:py-20 gap-4 flex flex-col w-full text-customDark2">
            <h1 className='text-2xl font-semibold text-customDark'>Product Details</h1>
            <p className="text-red-700 font-semibold text-lg flex flex-row gap-4">
                ${discountedPrice}
                <span className="text-base line-through text-customDark2 font-semibold">${product?.price}</span>
                <span className="bg-slate-50 text-sm px-1 shadow-md shadow-slate-400 rounded h-fit">
                    {product?.discountPercentage.toFixed(0)}% off
                </span>
            </p>
            <p className="text-lg font-semibold">{product?.brand}</p>
            <p className='font-semibold'>
                Description:
                <span className='font-normal pl-2'>{product?.description}</span>
            </p>
            <p className='flex items-center gap-2'><FaWeight size={22} />Weight: {product?.weight}</p>
            <p className='flex items-start gap-2'><TbDimensions size={22} />Dimensions: <br/>
                width: {product?.dimensions?.width} x
                height: {product?.dimensions?.height} x
                depth: {product?.dimensions?.depth}
            </p>
            <p className='flex items-center gap-2'><SiAdguard size={22} />Warranty: {product?.warrantyInformation}</p>
            <p className='flex items-center gap-2'><TbTruckReturn size={22} />Return Policy: {product?.returnPolicy}</p>
            <p className='flex items-center gap-2'><FaShippingFast size={22} />Shipping: {product?.shippingInformation}</p>
            <div className='py-4 gap-4 flex flex-col w-full border-t border-dashed border-customDark2'>
                <p className='flex items-center gap-2'><BiSolidCategory size={22} />Category: {product?.category}</p>
                <p className='flex items-center gap-2'><FaTag size={22} />Tags: {product?.tags?.map((tag, index) => (
                    <span key={index}>{tag}{index < product.tags.length - 1 ? ', ' : ''}</span>
                ))}</p>
            </div>
            <p>Quantity: </p>
            <Button quantity={0} isInCart={false} />
            <motion.button 
                onClick={addToCart}
                className='text-customDark border-2 border-customDark2 h-14 md:h-10 px-5 py-1 w-36 rounded-md flex items-center justify-center gap-2 font-semibold'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                Add to Cart
            </motion.button>
        </div>
    );
}

export default ProductDetails;
