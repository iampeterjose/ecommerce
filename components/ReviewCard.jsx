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
        <ul className="my-4 flex flex-col md:flex-row flex-wrap justify-evenly gap-6">
            {product.reviews.map((review, i) => (
                <li key={i} className="relative flex flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 border border-emerald-100 rounded-2xl shadow-lg p-6 w-full md:w-[320px] transition-all duration-200 hover:shadow-emerald-200">
                    <span className="absolute top-4 right-4 text-xs text-emerald-400 font-semibold">{formatDate(review.date)}</span>
                    <IoPersonCircleOutline size={56} className="text-emerald-300 mb-2" />
                    <p className="text-lg font-bold text-emerald-700 mb-1">{review.reviewerName}</p>
                    <div className="mb-2"><StarRating rating={review.rating} /></div>
                    <p className="text-base text-emerald-800 italic mb-2 text-center">“{review.comment}”</p>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ReviewCard