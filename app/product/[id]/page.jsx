"use client";
import StarRating from '@/components/StarRating';
// app/products/[id]/page.jsx
import { usePathname } from 'next/navigation';
import { MdPayments } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2"
import { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";

const ProductDetail = () => {
    const pathname = usePathname(); // Get the current pathname
    const id = pathname.split('/').pop(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [imageClicked, setImageClicked] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await result.json();
            setProduct(data);
            setImageClicked(data.thumbnail);
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

    if (!product) return <p className='px-2 md:px-5 py-16 md:py-5 '>Loading...</p>;

    return (
        <div className='flex flex-col px-2 md:px-5 py-16 md:py-5 md:gap-4 text-slate-700'>
            <div className='flex flex-col md:flex-row gap-4 border-b mb-4'>
                <div className='w-full'>
                    <h1 className='text-3xl font-semibold'>{product.title}</h1>
                    <StarRating rating={product.rating} />
                    <div className="mb-4 bg-slate-50 flex justify-center border-2 rounded-sm">
                        <img src={imageClicked} alt={product.title} className='w-[400px] h-[400px] rounded-sm'/>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {product.images.map((image, i) => (
                            <img src={image} alt={i} className={`w-[100px] h-[100px] border ${imageClicked === image && "bg-slate-100"} rounded-sm hover:cursor-pointer hover:bg-slate-100`} onClick={() => setImageClicked(image)} />
                        ))}
                    </div>
                    <p className='text-sm my-4'>Status: {product.availabilityStatus}</p>
                    <p className='text-sm my-4'>Stock: {product.stock}</p>
                </div>
                <div className="py-4 md:py-20 gap-4 flex flex-col w-full">
                    <h1 className='text-xl'>Product Details</h1>
                    <p>Price: ${product.price}</p>
                    <p>Brand: {!product.brand ? "N/A" : product.brand}</p>
                    <p className='font-semibold'>
                        Description: 
                        <span className='font-normal pl-2'>{product.description}</span>
                    </p>
                    <p>Weight: {product.weight}</p>
                    <p>Dimensions: &nbsp;
                        <span>width: {product.dimensions.width} x </span>
                        <span>height: {product.dimensions.height} x </span>
                        <span>depth: {product.dimensions.depth}</span>
                    </p>
                    <p>Warranty: {product.warrantyInformation}</p>
                    <p>Return Policy: {product.returnPolicy}</p>
                    <p>Shipping: {product.shippingInformation}</p>
                    <div>
                        <p>Category: {product.category}</p>
                        <p>Tags: {product.tags.map((tag) => (
                            <span>{tag}, </span>
                        ))}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p>Quantity: </p>
                        <span className='cursor-pointer'><HiMinusSmall /></span>
                        <input type="text" disabled className='border-b-2 border-customBlue px-2 py-1 text-base w-20 text-center' value="0" />
                        <span className='cursor-pointer'><GoPlus /></span>
                    </div>
                    <button className='bg-blue-500 text-white px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Buy Now <MdPayments /></button>
                    <button className='bg-orange-500 text-white px-5 py-1 w-40 rounded-sm flex items-center justify-center gap-2'>Add to Cart <FaCartArrowDown /></button>
                </div>
            </div>
            <div className='mt-10'>
                <div className='border p-2 md:p-5'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <h1 className='text-xl font-bold'>Give Your Feedback Here</h1>
                        <textarea placeholder='Write your feedback...' className='border-2 border-slate-200 rounded-sm w-[380px] h-[150px] p-4'></textarea>
                        <button className='bg-blue-500 text-white rounded-sm px-2 py-1'>Submit</button>
                    </div>
                    {product.reviews.length > 0 && (
                        <>
                        <h1 className='text-xl my-8 py-2'>Reviews</h1>
                        <ul className='my-4 flex flex-col flex-wrap md:flex-row justify-evenly gap-4 md:gap-6'>
                            {product.reviews.map((review, i) => (
                                <li key={i} className='border border-slate-100 p-2 md:p-5 bg-slate-50 w-full'>
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
