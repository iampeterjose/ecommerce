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

    const discount = ((product.discountPercentage * product.price) / 100).toFixed(2);
    const discountedPrice = (product.price-discount).toFixed(2);

    return (
        <div className="py-4 md:py-20 gap-4 flex flex-col w-full text-customDark2">
            <h1 className='text-xl font-semibold text-customDark'>Product Details</h1>
            <p className="text-red-700 font-semibold text-lg flex flex-row gap-4">${discountedPrice}<span className="text-base line-through text-customDark2 font-semibold ">${product.price}</span><span className=" bg-slate-50 text-sm px-1 shadow-md shadow-slate-400 rounded h-fit">{product.discountPercentage}% off</span></p>
            <p>By: {!product.brand ? "N/A" : product.brand}</p>
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
            <div className='py-4 gap-4 flex flex-col w-full border-t border-dashed border-customDark2'>
                <p className='flex items-center gap-2'><BiSolidCategory size={22} />Category: {product.category}</p>
                <p className='flex items-center gap-2'><FaTag size={22} />Tags: {product.tags.map((tag) => (
                    <span>{tag}, </span>
                ))}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p>Quantity: </p>
                <span className='cursor-pointer bg-customDark2 px-2 py-1 text-white'><HiMinusSmall /></span>
                <p disabled className='border-b-2 border-customDark px-2 py-1 text-base w-20 text-center'>0</p>
                <span className='cursor-pointer bg-customDark2 px-2 py-1 text-white'><GoPlus /></span>
            </div>
            <button className='bg-softgreen text-white h-14 md:h-auto px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Buy Now <MdPayments /></button>
            <button className='bg-orange-500 text-white h-14 md:h-auto px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Add to Cart <FaCartArrowDown /></button>
        </div>
    )
}

export default ProductDetails