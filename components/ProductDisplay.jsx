import useProductStore from "@/app/store/productStore";
import StarRating from "./StarRating";
import { motion } from "framer-motion";

const ProductDisplay = () => {
    const { product, imageClicked, setImageClicked } = useProductStore();

    return (
        <div className="w-full max-w-xl mx-auto p-4 md:p-8 flex flex-col gap-5">
            {/* Title and Rating */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1976D2] mb-2 tracking-tight leading-tight flex items-center gap-2">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-[#FF6F00]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-xs md:text-sm text-[#1976D2] font-medium">({product.reviews.length} Reviews)</span>
            </div>

            {/* Main Image */}
            <div className="mb-6 flex justify-center items-center bg-white border-2 border-[#1976D2]/20 rounded-2xl p-2 md:p-6 min-h-[320px]">
                <motion.img
                    src={imageClicked}
                    alt={product.title}
                    className="w-[220px] h-[220px] md:w-[340px] md:h-[340px] object-contain transition-all duration-200"
                    key={imageClicked}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-3 justify-center mb-4">
                {product.images.map((image, i) => (
                    <motion.img
                        key={i}
                        src={image}
                        alt={product.title + ' thumbnail ' + i}
                        className={`w-[48px] h-[48px] md:w-[70px] md:h-[70px] object-cover border-2 ${imageClicked === image ? ' ring-2 ring-[#FF6F00]' : 'border-[#E3E3E3]'} rounded-xl bg-white cursor-pointer hover:border-[#FF6F00] transition-all duration-200`}
                        onClick={() => setImageClicked(image)}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                    />
                ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 my-2 font-semibold">
                <span className={`px-3 py-1 rounded-full text-sm font-bold shadow ${product.stock > 0 ? 'bg-[#43A047]/20 text-[#43A047]' : 'bg-[#E53935]/20 text-[#E53935]'}`}>
                    {product.stock > 0 ? 'Available' : 'Not Available'}
                </span>
                <span className="text-[#1976D2] text-xs md:text-sm">{product.stock} in stock</span>
            </div>
        </div>
    );
}

export default ProductDisplay;