"use client";   
import { useState } from "react";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5] relative overflow-hidden">
            {/* Decorative background image, less blur and higher opacity for more visibility */}
            <img src="/assets/shopping1.png" alt="Background" className="absolute w-[900px] pointer-events-none select-none" style={{zIndex:0}} />
            <form className="relative z-10 flex flex-col w-full max-w-md bg-white/40 backdrop-blur-md p-10 gap-y-8 text-[#1976D2] shadow-2xl border-2 border-[#1976D2]/20 rounded-3xl">
                <h1 className="text-4xl font-extrabold text-[#1976D2] text-center mb-4 tracking-tight drop-shadow">Sign In</h1>
                {/* Email Input with fieldset */}
                <fieldset className="border-0 flex flex-col gap-2">
                    <label htmlFor="email" className="text-base font-semibold text-[#1976D2]">Email Address</label>
                    <div className="relative">
                        <input 
                            id="email"
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-4 text-base w-full rounded-2xl bg-[#F5F5F5] focus:ring-2 focus:ring-[#1976D2] outline-none shadow-inner placeholder:text-[#1976D2]/40 transition-all duration-200 border border-[#1976D2]/20"
                            autoComplete="email"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1976D2]/60 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75L12 15.75L7.5 12.75M12 15.75V8.25" />
                            </svg>
                        </span>
                    </div>
                </fieldset>
                {/* Password Input with fieldset */}
                <fieldset className="border-0 flex flex-col gap-2">
                    <label htmlFor="password" className="text-base font-semibold text-[#1976D2]">Password</label>
                    <div className="relative">
                        <input 
                            id="password"
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-4 text-base w-full rounded-2xl bg-[#F5F5F5] focus:ring-2 focus:ring-[#1976D2] outline-none shadow-inner placeholder:text-[#1976D2]/40 transition-all duration-200 border border-[#1976D2]/20"
                            autoComplete="current-password"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1976D2]/60 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V8.25M12 8.25L7.5 12.75M12 8.25L16.5 12.75" />
                            </svg>
                        </span>
                    </div>
                </fieldset>
                <button
                    className="w-full py-3 font-bold bg-[#FF6F00] hover:bg-[#1976D2] text-white rounded-2xl shadow-xl transition-all duration-200 text-lg tracking-wide mt-2 border border-[#1976D2]/30 focus:outline-none focus:ring-2 focus:ring-[#1976D2]/40"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-center text-[#1976D2]">Don't have an account? <a href="#" className="underline hover:text-[#FF6F00] font-semibold transition-colors">Sign up here.</a></p>
            </form>
        </div>
    )
}

export default page