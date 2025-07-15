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
        <h1 className='text-xl font-semibold mt-14 px-2 text-center text-[#1976D2]'>Reviews</h1>
        <ul className="my-4 flex flex-col md:flex-row flex-wrap justify-evenly gap-6">
            {product.reviews.map((review, i) => (
                <li key={i} className="relative flex flex-col items-center bg-[#F5F5F5] border border-[#1976D2]/20 rounded-2xl shadow-lg p-6 w-full md:w-[320px] transition-all duration-200 hover:shadow-[#FF6F00]/30">
                    <span className="absolute top-4 right-4 text-xs text-[#1976D2] font-semibold">{formatDate(review.date)}</span>
                    <IoPersonCircleOutline size={56} className="text-[#1976D2] mb-2" />
                    <p className="text-lg font-bold text-[#1976D2] mb-1 text-center">{review.reviewerName}</p>
                    <div className="mb-2 flex justify-center"><StarRating rating={review.rating} /></div>
                    <p className="text-base text-[#424242] italic mb-2 text-center">“{review.comment}”</p>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ReviewCard