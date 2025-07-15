import useProductStore from "@/app/store/productStore";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListSkeleton = ({ productsCount }) => {
    const { isOpen } = useProductStore();
    const skeletonCount = productsCount;

    return (
        <>
            <span>
                <Skeleton width={120} height={24} className="mb-4 rounded-md bg-[#F5F5F5]" baseColor="#F5F5F5" highlightColor="#1976D2" />
            </span>
            <ul className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-5 lg:gap-4`}> 
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <li key={index} className="flex flex-col bg-white border border-[#E3E3E3] shadow-lg px-3 py-3 rounded-2xl relative transition-all duration-200">
                        <Skeleton height={170} className="mb-4 rounded-xl" baseColor="#F5F5F5" highlightColor="#1976D2" />
                        <Skeleton height={18} className="my-2 rounded" width="75%" baseColor="#F5F5F5" highlightColor="#1976D2" />
                        <Skeleton height={16} className="my-1 rounded" width="55%" baseColor="#F5F5F5" highlightColor="#1976D2" />
                        <div className="flex justify-between items-center mt-auto mb-4">
                            <Skeleton width="45%" height={22} className="rounded" baseColor="#F5F5F5" highlightColor="#1976D2" />
                            <Skeleton width={28} height={28} circle className="border-2 border-[#1976D2]/30" baseColor="#F5F5F5" highlightColor="#1976D2" />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductListSkeleton;
