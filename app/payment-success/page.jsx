"use client";
import Link from "next/link";

const page = ({searchParams}) => {
    const amount = searchParams.amount;

    return (
        <div className="flex flex-col justify-center items-center py-20 md:py-10 min-h-screen bg-[#F5F5F5] px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center gap-4 border-2 border-[#1976D2]/20 animate-fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 text-[#1976D2] mb-2">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#E3F2FD" />
                    <path strokeLinecap="round" strokeLinejoin="round" stroke="#43A047" strokeWidth="2.5" d="M8 12.5l3 3 5-5" />
                </svg>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#1976D2] tracking-tight text-center">Payment Successful!</h1>
                <p className="mt-2 text-lg md:text-xl text-[#43A047] text-center">Thank you for your payment of <span className="font-bold text-[#1976D2]">${amount}</span>!</p>
                <Link href="/">
                    <button className="mt-6 flex items-center gap-2 bg-[#FF6F00] hover:bg-[#1976D2] text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-200 border border-[#FF6F00]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/40">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l6-6m-6 6l6 6" />
                        </svg>
                        Go back to Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default page;