import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductDetailsSkeleton = () => {
    return (
        <div className="flex flex-col py-10 md:py-8 gap-8 text-emerald-700 px-2 md:px-10 lg:px-32 bg-emerald-50/40 min-h-screen">
            {/* Main Product Card Skeleton */}
            <div className="w-full flex flex-col md:flex-row gap-8 bg-white rounded-3xl shadow-2xl p-6 md:p-10 relative animate-pulse">
                {/* Product Image Skeleton */}
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <Skeleton height={40} width={220} className="mb-4 rounded-md" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <span className="flex items-center gap-4 mb-2">
                        <Skeleton width={100} height={20} className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <Skeleton width={60} height={20} className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    </span>
                    <div className="mb-4 flex justify-center items-center bg-emerald-50 border-2 border-emerald-100 rounded-2xl shadow-lg">
                        <Skeleton height={320} width={320} className="rounded-xl" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mb-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} height={64} width={64} className="rounded-xl border border-emerald-100" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        ))}
                    </div>
                    <span className="flex items-center gap-2 my-2 font-semibold">
                        <Skeleton height={28} width={90} className="rounded-full" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <Skeleton height={20} width={60} className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    </span>
                </div>
                {/* Product Details Skeleton */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <Skeleton height={32} width="60%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <div className="flex items-center gap-4 mb-2">
                        <Skeleton height={28} width={100} className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <Skeleton height={28} width={80} className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <Skeleton height={28} width={60} className="rounded-full" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    </div>
                    <Skeleton height={20} width="80%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <Skeleton height={20} width="90%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <Skeleton height={20} width="70%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <Skeleton height={20} width="60%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <Skeleton height={20} width="80%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <Skeleton height={20} width="50%" className="mb-2 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    <Skeleton height={40} width="40%" className="mb-2 rounded-xl" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                </div>
            </div>
            {/* Related Products Skeleton */}
            <div className="w-full bg-emerald-100/40 rounded-2xl shadow-inner p-6 md:p-10 my-2 animate-pulse">
                <Skeleton height={28} width="30%" className="mb-4 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={180} className="rounded-2xl border border-emerald-100" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                    ))}
                </div>
            </div>
            {/* Reviews Skeleton */}
            <div className="w-full bg-white rounded-2xl shadow-inner p-6 md:p-10 mt-2 animate-pulse">
                <Skeleton height={28} width="30%" className="mb-4 rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                <div className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <Skeleton height={20} width="40%" className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                            <Skeleton height={15} width="80%" className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
