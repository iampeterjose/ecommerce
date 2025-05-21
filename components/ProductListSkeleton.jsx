import useProductStore from "@/app/store/productStore";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListSkeleton = ({ productsCount }) => {
    const { isOpen } = useProductStore();
    const skeletonCount = productsCount;

    return (
        <>
            <span>
                <Skeleton width={120} height={24} className="mb-4 rounded-md bg-emerald-100" baseColor="#d1fae5" highlightColor="#a7f3d0" />
            </span>
            <ul className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-5 lg:gap-4`}> 
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <li key={index} className="flex flex-col bg-white/90 border border-emerald-100 shadow-lg px-4 py-4 rounded-2xl relative transition-all duration-200">
                        <Skeleton height={170} className="mb-4 rounded-xl" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <Skeleton height={18} className="my-2 rounded" width="75%" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <Skeleton height={16} className="my-1 rounded" width="55%" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        <div className="flex justify-between items-center mt-auto mb-4">
                            <Skeleton width="45%" height={22} className="rounded" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                            <Skeleton width={28} height={28} circle className="border-2 border-emerald-200" baseColor="#d1fae5" highlightColor="#a7f3d0" />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductListSkeleton;
