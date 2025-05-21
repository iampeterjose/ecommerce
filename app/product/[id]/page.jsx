"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import useProductStore from '@/app/store/productStore';
import ProductDisplay from '@/components/ProductDisplay';
import ProductDetails from '@/components/ProductDetails';
import Reviews from '@/components/Reviews';
import RelatedProducts from '@/components/RelatedProducts';
import ProductDetailsSkeleton from '@/components/ProductDetailsSkeleton';

const ProductDetail = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const { product, setProduct, setImageClicked } = useProductStore();
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await result.json();
                setProduct(data);
                setImageClicked(data.thumbnail);
            } catch (error) {
                console.log(`Error connecting to server: `, error);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    if (!product) return <ProductDetailsSkeleton />;

    return (
        <div className="min-h-screen bg-emerald-50/40 py-10 px-2 md:px-10 lg:px-32 flex flex-col gap-8">
            {/* Floating Back Button */}
            <button
                className="fixed top-24 left-4 z-30 flex items-center gap-2 bg-white border border-emerald-100 shadow-lg rounded-full px-4 py-2 text-emerald-600 font-bold hover:bg-emerald-100 transition-colors duration-200"
                onClick={() => router.back()}
                aria-label="Go back"
            >
                <FiArrowLeft size={22} />
                <span className="hidden md:inline">Back</span>
            </button>

            {/* Main Product Card */}
            <div className="w-full flex flex-col md:flex-row gap-8 bg-white rounded-3xl shadow-2xl p-6 md:p-10 relative">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <ProductDisplay />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <ProductDetails />
                </div>
            </div>

            {/* Related Products Section */}
            <section className="w-full bg-emerald-100/40 rounded-2xl shadow-inner p-6 md:p-10">
                <h2 className="text-2xl font-extrabold text-emerald-700 mb-4 tracking-tight">Related Products</h2>
                <RelatedProducts />
            </section>

            {/* Reviews Section */}
            <section className="w-full bg-white rounded-2xl shadow-inner p-6 md:p-10 mt-2">
                <h2 className="text-2xl font-extrabold text-emerald-700 mb-4 tracking-tight">Customer Reviews</h2>
                <Reviews />
            </section>
        </div>
    );
};

export default ProductDetail;
