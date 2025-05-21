"use client";   
import { useState } from "react";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative overflow-hidden">
            {/* Decorative background image, less blur and higher opacity for more visibility */}
            <img src="/assets/shopping1.png" alt="Background" className="absolute w-[900px] opacity-50 blur-sm pointer-events-none select-none" style={{zIndex:0}} />
            <form className="relative z-10 flex flex-col w-full max-w-sm bg-white/40 backdrop-blur-2xl p-10 gap-y-8 text-emerald-700 shadow-2xl border-0 rounded-3xl ring-2 ring-emerald-200/60">
                <h1 className="text-4xl font-extrabold text-emerald-700 text-center mb-4 tracking-tight drop-shadow">Sign In</h1>
                {/* Email Input with fieldset */}
                <fieldset className="border-0 flex flex-col gap-2">
                    <label htmlFor="email" className="text-base font-semibold text-emerald-700">Email Address</label>
                    <div className="relative">
                        <input 
                            id="email"
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-4 text-base w-full rounded-2xl bg-emerald-50/60 focus:ring-2 focus:ring-emerald-400 outline-none shadow-inner placeholder:text-emerald-300 transition-all duration-200"
                            autoComplete="email"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75L12 15.75L7.5 12.75M12 15.75V8.25" />
                            </svg>
                        </span>
                    </div>
                </fieldset>
                {/* Password Input with fieldset */}
                <fieldset className="border-0 flex flex-col gap-2">
                    <label htmlFor="password" className="text-base font-semibold text-emerald-700">Password</label>
                    <div className="relative">
                        <input 
                            id="password"
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-4 text-base w-full rounded-2xl bg-emerald-50/60 focus:ring-2 focus:ring-emerald-400 outline-none shadow-inner placeholder:text-emerald-300 transition-all duration-200"
                            autoComplete="current-password"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V8.25M12 8.25L7.5 12.75M12 8.25L16.5 12.75" />
                            </svg>
                        </span>
                    </div>
                </fieldset>
                <button
                    className="w-full py-3 font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-lg tracking-wide mt-2"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-center text-emerald-600">Don't have an account? <a href="#" className="underline hover:text-emerald-800 font-semibold transition-colors">Sign up here.</a></p>
            </form>
        </div>
    )
}

export default page