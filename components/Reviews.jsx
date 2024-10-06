import useProductStore from "@/app/store/productStore";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
    const { product } = useProductStore();

    return (
        <div className='py-2'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='text-xl font-bold'>Give Your Feedback Here</h1>
                <textarea placeholder='Write your feedback...' className='border-2 border-customDark rounded-md w-[380px] h-[150px] p-4'></textarea>
                <button className='text-customDark border-2 border-customDark2 font-semibold md:h-auto rounded-md px-5 py-2'>Submit</button>
            </div>
            {product.reviews.length > 0 ? (
                <ReviewCard />
            ) : (
                <p>No feedback yet.</p>
            )}
        </div>
    )
}

export default Reviews