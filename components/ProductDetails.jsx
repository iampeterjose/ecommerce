import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { SiAdguard } from "react-icons/si";
import { TbDimensions } from "react-icons/tb";
import { FaWeight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaTag } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2"
import useProductStore from "@/app/store/productStore";

const ProductDetails = () => {
    const { product } = useProductStore();

    return (
        <div className="py-4 md:py-20 gap-4 flex flex-col w-full">
            <h1 className='text-xl'>Product Details</h1>
            <p>Price: ${product.price}</p>
            <p>Brand: {!product.brand ? "N/A" : product.brand}</p>
            <p className='font-semibold'>
                Description: 
                <span className='font-normal pl-2'>{product.description}</span>
            </p>
            <p className='flex items-center gap-2'><FaWeight size={22} />Weight: {product.weight}</p>
            <p className='flex items-start gap-2'><TbDimensions size={22} />Dimensions: <br/>
                width: {product.dimensions.width} x
                height: {product.dimensions.height} x
                depth: {product.dimensions.depth}
            </p>
            <p className='flex items-center gap-2'><SiAdguard size={22} />Warranty: {product.warrantyInformation}</p>
            <p className='flex items-center gap-2'><TbTruckReturn size={22} />Return Policy: {product.returnPolicy}</p>
            <p className='flex items-center gap-2'><FaShippingFast size={22} />Shipping: {product.shippingInformation}</p>
            <div className='py-4 gap-4 flex flex-col w-full border-t border-dashed border-customBlue'>
                <p className='flex items-center gap-2'><BiSolidCategory size={22} />Category: {product.category}</p>
                <p className='flex items-center gap-2'><FaTag size={22} />Tags: {product.tags.map((tag) => (
                    <span>{tag}, </span>
                ))}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p>Quantity: </p>
                <span className='cursor-pointer bg-customBlue px-2 py-1 text-white'><HiMinusSmall /></span>
                <input type="text" disabled className='border-b-2 border-customBlue px-2 py-1 text-base w-20 text-center' value="0" />
                <span className='cursor-pointer bg-customBlue px-2 py-1 text-white'><GoPlus /></span>
            </div>
            <button className='bg-blue-500 text-white h-14 md:h-auto px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Buy Now <MdPayments /></button>
            <button className='bg-orange-500 text-white h-14 md:h-auto px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Add to Cart <FaCartArrowDown /></button>
        </div>
    )
}

export default ProductDetails