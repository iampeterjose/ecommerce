"use client";
import Link from "next/link";

const page = ({searchParams}) => {
    const amount = searchParams.amount;

    return (
        <div className="flex flex-col justify-center items-center py-16 md:py-5 min-h-screen">
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="mt-4 text-lg">Thank you for your payment of ${amount}!</p>
            <Link href="/"><p className="mt-4 px-5 py-2 border-2 border-customOrange2 text-customOrange2 font-semibold rounded-md">Go back to Home</p></Link>
        </div>
    )
}

export default page