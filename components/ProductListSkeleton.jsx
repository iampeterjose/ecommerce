import useProductStore from "@/app/store/productStore";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ProductListSkeleton = ({ productsCount }) => {
    const { isOpen } = useProductStore();

    // Use itemsPerPage or default to 30 if not provided
    const skeletonCount = productsCount; 
    console.log(`Skeleton count: `,productsCount);

    return (
        <>
            <span>
                <Skeleton width={100} height={20} className="mb-2" />
            </span>
            <ul className={`grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-${isOpen ? '2' :'3'} grid-cols-2 gap-3 lg:gap-2`}>
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <li key={index} className={`flex flex-col bg-white px-3 rounded-sm relative`}>
                        <Skeleton height={150} className="mb-2" />
                        <Skeleton height={15} className="my-1" width="70%" />
                        <Skeleton height={15} className="my-1" width="50%" />
                        <div className="flex justify-between items-center mt-auto mb-6">
                            <Skeleton width="40%" height={20} />
                            <Skeleton width={20} height={20} circle />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductListSkeleton;
