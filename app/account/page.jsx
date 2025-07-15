"use client"; // if using in a Next.js app
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Page = () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Simulate a data fetching delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Adjust the timeout to simulate loading

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center py-20 md:py-10 min-h-screen bg-[#F5F5F5] px-4">
            {loading ? (
                <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center gap-6 border-2 border-[#1976D2]/20 animate-pulse">
                    <Skeleton height={40} width={180} className="mb-4 rounded" baseColor="#F5F5F5" highlightColor="#1976D2" />
                    <Skeleton count={3} className="mb-4 rounded" baseColor="#F5F5F5" highlightColor="#1976D2" />
                </div>
            ) : (
                <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center gap-6 border-2 border-[#1976D2]/20 animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-16 h-16 text-[#1976D2] mb-2">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="#E3F2FD" />
                        <path strokeLinecap="round" strokeLinejoin="round" stroke="#43A047" strokeWidth="2" d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" />
                    </svg>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#1976D2] tracking-tight text-center">My Account</h1>
                    <p className="text-[#424242] text-lg text-center max-w-md">
                        Welcome to your account dashboard. Here you can view and manage your personal information, orders, and preferences. More features coming soon!
                    </p>
                    <a href="/history" className="mt-4 w-full max-w-xs">
                        <button className="w-full py-3 font-bold bg-[#FF6F00] hover:bg-[#1976D2] text-white rounded-xl shadow-lg transition-all duration-200 text-lg border border-[#FF6F00]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/40">
                            View Order History
                        </button>
                    </a>
                </div>
            )}
        </div>
    );
}

export default Page;
