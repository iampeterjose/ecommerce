
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { FaC } from "react-icons/fa6";

const page = () => {
    return (
        <div className="flex flex-col py-16 md:py-5 min-h-screen">
            <div className="flex items-baseline justify-between">
            <h1 className="text-2xl text-customDark font-semibold">
                Shopping Cart
            </h1>
            <p className="text-sm font-semibold underline text-customDark2">Continue shopping</p>
            </div>
            <div className="flex flex-col justify-center items-center bg-white text-customDark2 gap-4 py-20 my-10 rounded-md">
                <span>
                    <FaCartArrowDown size={50} color="#eeeeee" />
                </span>
                <p className="text-lg font-semibold">Your Cart is Empty</p>
                <Link href="/products"><p className="bg-red-600 text-white px-5 py-2 text-sm font-semibold rounded-md">Shop Now</p></Link>
            </div>
        </div>
    )
}

export default page