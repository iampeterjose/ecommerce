import useProductStore from "@/app/store/productStore";
import StarRating from "./StarRating";

const ProductDisplay = () => {
    const { product, imageClicked, setImageClicked } = useProductStore();

    return (
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
                    <img src={image} alt={i} className={`w-[100px] h-[100px] border border-customBlue ${imageClicked === image && "bg-slate-200 border-2"} rounded-sm hover:cursor-pointer hover:bg-slate-200`} onClick={() => setImageClicked(image)} />
                ))}
            </div>
            <span className='flex items-center my-2 font-semibold gap-2'>
                <p className={`${product.stock > 0 ? "bg-green-300 text-green-700" : "bg-red-300 text-red-700"} px-2 py-1 w-fit rounded-md`}>
                    {product.stock > 0 ? "Available" : "Not Available"}
                </p>
                <p className='text-slate-500'>
                    {product.stock} Stocks
                </p>
            </span>
        </div>
    )
}

export default ProductDisplay