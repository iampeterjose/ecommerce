import { FaShippingFast } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";

const Hero = () => {
    return (
        <section className="flex flex-col min-h-screen" id="/">
            <div className="w-full">
                <img src="/assets/shopping1.png" alt="HeroBg" className="w-full h-[300px] md:h-[600px] bg-gradient-to-r from-customBlue to-purple-950 absolute md:static left-0 top-12" />
                <div className="absolute top-36 md:top-60 text-[#001f3f] font-bold px-3 md:px-7 py-2 md:py-10 bg-white opacity-80 left-0 md:left-auto">
                    <h1 className="text-xl md:text-3xl">
                        Quality Products, <br/><span className="md:text-5xl">Unbeatable Prices!</span>
                    </h1>
                    <p className="my-2 text-xs md:text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>Quos fugit aut ratione sint porro recusandae, <br/>sequi ipsa praesentium placeat officiis vel obcaecati consectetur nisi corporis <br/>qui sit cupiditate. Illo, omnis!
                    </p>
                    <p className="bg-blue-500 px-2 py-2 text-white w-fit">Find More</p>
                </div>
                <div className="flex w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-2xl overflow-x-auto whitespace-nowrap flex-row justify-between items-center absolute md:relative left-0 md:left-auto top-80 md:top-auto px-2 py-6 md:py-4 my-5 md:my-auto gap-2 text-md md:font-xl font-semibold text-slate-700 bg-white">
                    <h2>Brand New</h2>
                    <h2 className="flex items-center gap-1"><FaShippingFast size={30} />Fast Delivery</h2>
                    <h2 className="flex items-center gap-1"><MdBookOnline size={30} />Online Payment</h2>
                    <h2 className="flex items-center gap-1"><RiDiscountPercentFill size={30} />Special Discount</h2>
                </div>
            </div>
        </section>
    )
}

export default Hero