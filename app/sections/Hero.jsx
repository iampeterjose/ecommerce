import { FaShippingFast } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import ProductAndServices from "./ProductAndServices";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="flex flex-col min-h-screen" id="/">
            <div className="w-full">
                <img src="/assets/shopping1.png" alt="HeroBg" className="w-full h-[400px] md:h-[600px] absolute md:static left-0 top-12" />
                <div className="absolute top-60 md:top-60 text-[#333333] font-bold px-3 md:px-7 py-2 md:py-10 bg-white opacity-90 left-0 md:left-auto">
                    <h1 className="text-xl md:text-3xl">
                        Quality Products, <br/><span className="md:text-5xl">Unbeatable Prices!</span>
                    </h1>
                    <Link href="#featured"><p className="bg-softgreen px-2 py-2 text-white w-fit">Find More</p></Link>
                </div>
                <div className="flex w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-2xl overflow-x-auto whitespace-nowrap flex-row justify-between items-center absolute md:relative left-0 md:left-auto top-96 md:top-auto px-2 py-6 md:py-4 my-8 md:my-auto gap-2 text-md md:font-xl font-semibold text-customBlue bg-softgreenl">
                    <h2>Brand New</h2>
                    <h2 className="flex items-center gap-1"><FaShippingFast size={30} />Fast Delivery</h2>
                    <h2 className="flex items-center gap-1"><MdBookOnline size={30} />Online Payment</h2>
                    <h2 className="flex items-center gap-1"><RiDiscountPercentFill size={30} />Special Discount</h2>
                </div>
            </div>
            <ProductAndServices />  
        </section>
    )
}

export default Hero