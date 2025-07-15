import useProductStore from "@/app/store/productStore";
import ReviewCard from "./ReviewCard";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Reviews = () => {
    const { product } = useProductStore();

    return (
        <div className="py-6 w-full max-w-2xl mx-auto">
            {/* Feedback Form Card */}
            <div className="flex flex-col justify-center items-center gap-4 bg-[#F5F5F5] rounded-3xl shadow-xl p-8 mb-10 border border-[#1976D2]/20">
                <FaUserCircle size={48} className="text-[#1976D2] mb-2" />
                <div className="relative w-full">
                    <textarea
                        id="feedback"
                        placeholder=" "
                        className="peer border-2 border-[#1976D2]/30 focus:border-[#1976D2] rounded-xl w-full min-h-[120px] md:min-h-[150px] p-4 text-[#424242] bg-white resize-none transition-all duration-200 outline-none shadow-sm"
                    ></textarea>
                    <label htmlFor="feedback" className="absolute left-4 top-3 text-[#1976D2] text-base font-medium pointer-events-none transition-all duration-200 peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#FF6F00] bg-white px-1 rounded">
                        Write your feedback...
                    </label>
                </div>
                <motion.button
                    className="mt-2 bg-[#FF6F00] hover:bg-[#1976D2] text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide border border-[#FF6F00]/30"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Submit
                </motion.button>
            </div>
            {/* Divider and Heading */}
            <div className="flex flex-col items-center mb-6">
                <span className="block w-16 h-1 rounded-full bg-[#1976D2] mb-2"></span>
                <h2 className="text-xl font-extrabold text-[#1976D2] tracking-tight text-center">Customer Reviews</h2>
            </div>
            {/* Review List */}
            <div className="w-full">
                <AnimatePresence>
                    {product.reviews.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ReviewCard />
                        </motion.div>
                    ) : (
                        <motion.p
                            className="text-[#E53935] text-center font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >No feedback yet.</motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Reviews;