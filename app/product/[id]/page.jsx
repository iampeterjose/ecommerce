"use client";
// app/products/[id]/page.jsx
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/Loading';
import useProductStore from '@/app/store/productStore';
import ProductDisplay from '@/components/ProductDisplay';
import ProductDetails from '@/components/ProductDetails';
import Reviews from '@/components/Reviews';
import RelatedProducts from '@/components/RelatedProducts';
import ProductDetailsSkeleton from '@/components/ProductDetailsSkeleton';

const ProductDetail = () => {
    const pathname = usePathname(); // Get the current pathname
    const id = pathname.split('/').pop(); // Get the product ID from the URL
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
                console.log(`Error connecting to server: `,error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (!product) return (
        <ProductDetailsSkeleton />
    );

    return (
        <div className='flex flex-col py-16 md:py-5 md:gap-4 text-customBlue2 px-2 md:px-32 mt-10'>
            <div className='flex flex-col md:flex-row gap-4 pb-10'>
                <span className='absolute top-28 md:top-auto right-0 mr-3 text-3xl font-extrabold cursor-pointer' onClick={()=>router.back()}>&times;</span>
                <ProductDisplay />
                <ProductDetails />

            </div>
            <RelatedProducts />
            <div className='mt-44'>
                <Reviews />
            </div>
        </div>
    );
};

export default ProductDetail;
