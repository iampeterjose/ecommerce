import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetailsSkeleton = () => {
    return (
        <div className='flex flex-col py-16 md:py-5 md:gap-4 text-customDark'>
            <div className='flex flex-col md:flex-row gap-4 pb-10'>
                <span className='absolute top-28 md:top-auto right-0 mr-3 text-3xl font-extrabold cursor-pointer'>
                    <Skeleton width={30} height={30} />
                </span>
                {/* ProductDisplay Skeleton */}
                <div className='w-full'>
                    <Skeleton height={40} width="50%" className="mb-4" />
                    <span className='flex items-center gap-4'>
                        <Skeleton width={100} height={20} />
                        <Skeleton width={60} height={20} />
                    </span>
                    <div className="mb-4 bg-white flex justify-center border border-customDark2 rounded-md">
                        <Skeleton height={400} width={400} />
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton key={index} height={100} width={100} className="border border-customDark2 rounded-md" />
                        ))}
                    </div>
                    <span className='flex items-center my-2 font-semibold gap-2'>
                        <Skeleton height={30} width={80} />
                        <Skeleton height={20} width={60} />
                    </span>
                </div>

                {/* ProductDetails Skeleton */}
                <div className="py-4 md:py-20 gap-4 flex flex-col w-full text-customDark2">
                    <Skeleton height={30} width="50%" className="mb-4" />
                    <p className="text-red-700 font-semibold text-lg flex flex-row gap-4">
                        <Skeleton height={30} width={100} />
                        <Skeleton height={30} width={80} />
                        <Skeleton height={30} width={80} />
                    </p>
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={20} className="mb-2" />
                    <Skeleton height={40} className="mb-2" />
                </div>
            </div>

            {/* RelatedProducts Skeleton */}
            <div className='my-4'>
                <Skeleton height={30} width="80%" className="mb-2" />
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={200} className="rounded-md" />
                    ))}
                </div>
            </div>

            {/* Reviews Skeleton */}
            <div className='mt-44'>
                <Skeleton height={30} width="50%" className="mb-4" />
                <div className='flex flex-col gap-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='flex flex-col'>
                            <Skeleton height={20} className="mb-2" />
                            <Skeleton height={15} width="80%" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
