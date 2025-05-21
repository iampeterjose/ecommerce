import useProductStore from "@/app/store/productStore";
import StarRating from "./StarRating";
import { motion } from "framer-motion";

const ProductDisplay = () => {
    const { product, imageClicked, setImageClicked } = useProductStore();

    return (
        <div className="w-full max-w-xl mx-auto">
            {/* Title and Rating */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2 tracking-tight leading-tight">
                {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-emerald-500 font-medium">({product.reviews.length} Reviews)</span>
            </div>

            {/* Main Image */}
            <div className="mb-6 flex justify-center items-center bg-emerald-50 border-2 border-emerald-100 rounded-2xl shadow-lg p-2 md:p-4 min-h-[320px]">
                <motion.img
                    src={imageClicked}
                    alt={product.title}
                    className="w-[260px] h-[260px] md:w-[400px] md:h-[400px] object-contain rounded-xl bg-white shadow-md border border-emerald-100 transition-all duration-200"
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
                        className={`w-[64px] h-[64px] md:w-[90px] md:h-[90px] object-cover border-2 ${imageClicked === image ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-emerald-100'} rounded-xl bg-white shadow-sm cursor-pointer hover:border-emerald-400 transition-all duration-200`}
                        onClick={() => setImageClicked(image)}
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                    />
                ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 my-2 font-semibold">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow ${product.stock > 0 ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'}`}>
                    {product.stock > 0 ? 'Available' : 'Not Available'}
                </span>
                <span className="text-emerald-700 text-sm">{product.stock} in stock</span>
            </div>
        </div>
    );
}

export default ProductDisplay;