import useProductStore from "@/app/store/productStore";
import { IoPersonCircleOutline } from "react-icons/io5";
import StarRating from "./StarRating";

const ReviewCard = () => {
    const { product } = useProductStore();

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

    return (
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
    )
}

export default ReviewCard