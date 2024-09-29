"use client";
import StarRating from '@/components/StarRating';
// app/products/[id]/page.jsx
import { usePathname, useRouter } from 'next/navigation';
import { MdPayments } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2"
import { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { SiAdguard } from "react-icons/si";
import { TbDimensions } from "react-icons/tb";
import { FaWeight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaTag } from "react-icons/fa6";

const ProductDetail = () => {
    const pathname = usePathname(); // Get the current pathname
    const id = pathname.split('/').pop(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [imageClicked, setImageClicked] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await result.json();
                setProduct(data);
                setImageClicked(data.thumbnail);
            } catch (error) {
                console.log(`Error connecting to server: `,error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false // Set to true for 12-hour format
        };
        const date = new Date(dateString);
        return date.toLocaleString('en-US', options).replace(',', ''); // Remove the comma before the time
    };

    if (!product) return (
        <div className="flex fixed flex-col gap-2 px-10 py-4 top-0 w-full h-full bg-slate-50 opacity-70 justify-center items-center">
            <p className="text-lg font-semibold">Loading</p>
            <AiOutlineLoading3Quarters size={25} className="animate-spin" />
        </div>
    );

    return (
        <div className='flex flex-col py-16 md:py-5 md:gap-4 text-slate-700'>
            <div className='flex flex-col md:flex-row gap-4 border-b border-customBlue pb-10'>
            <span className='absolute right-0 mr-3 text-3xl font-extrabold cursor-pointer' onClick={()=>router.back()}>&times;</span>
                <div className='w-full'>
                    <h1 className='text-3xl font-semibold'>{product.title}</h1>
                    <span className='flex items-center gap-4'>
                        <StarRating rating={product.rating} /><span className='text-sm'>({product.reviews.length} Reviews)</span>
                    </span>
                    <div className="mb-4 bg-white flex justify-center border-2 border-customBlue rounded-md">
                        <img src={imageClicked} alt={product.title} className='w-[400px] h-[400px]'/>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {product.images.map((image, i) => (
                            <img src={image} alt={i} className={`w-[100px] h-[100px] border border-customBlue ${imageClicked === image && "bg-slate-300 border-2"} rounded-sm hover:cursor-pointer hover:bg-slate-300`} onClick={() => setImageClicked(image)} />
                        ))}
                    </div>
                    <p className='text-sm font-semibold my-2'>Status: {product.availabilityStatus}</p>
                    <p className='text-sm font-semibold my-2'>Stock: {product.stock}</p>
                </div>
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
                        <span className='cursor-pointer'><HiMinusSmall /></span>
                        <input type="text" disabled className='border-b-2 border-customBlue px-2 py-1 text-base w-20 text-center' value="0" />
                        <span className='cursor-pointer'><GoPlus /></span>
                    </div>
                    <button className='bg-blue-500 text-white h-14 md:h-auto px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Buy Now <MdPayments /></button>
                    <button className='bg-orange-500 text-white h-14 md:h-auto px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Add to Cart <FaCartArrowDown /></button>
                </div>
            </div>
            <div className='mt-20'>
                <div className='py-2'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <h1 className='text-xl font-bold'>Give Your Feedback Here</h1>
                        <textarea placeholder='Write your feedback...' className='border-2 border-customBlue rounded-md w-[380px] h-[150px] p-4'></textarea>
                        <button className='bg-blue-500 text-white h-14 md:h-auto rounded-sm px-5 py-1'>Submit</button>
                    </div>
                    {product.reviews.length > 0 && (
                        <>
                        <h1 className='text-xl font-semibold mt-14 px-2'>Reviews</h1>
                        <ul className='my-4 flex flex-col flex-wrap md:flex-row justify-evenly gap-4 md:gap-6'>
                            {product.reviews.map((review, i) => (
                                <li key={i} className='border border-customBlue rounded-md p-2 md:p-5 bg-slate-50 w-full'>
                                    <IoPersonCircleOutline size={75} />
                                    <p className='text-md'>{review.reviewerName}</p>
                                    <p className='text-xs'><StarRating rating={product.rating} /></p>
                                    <p className='text-sm my-2'>Comment: {review.comment}</p>
                                    <p className='text-xs'>{formatDate(review.date)}</p>
                                </li>
                            ))}
                        </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
