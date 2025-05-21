"use client";   
import { useState } from "react";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 relative overflow-hidden">
            {/* Decorative background image, less blur and higher opacity for more visibility */}
            <img src="/assets/shopping1.png" alt="Background" className="absolute w-[900px] opacity-90 blur-sm pointer-events-none select-none" style={{zIndex:0}} />
            <form className="relative z-10 flex flex-col w-full max-w-sm bg-white/90 backdrop-blur-md p-8 gap-y-6 text-emerald-700 shadow-2xl border border-emerald-100 rounded-3xl">
                <h1 className="text-3xl font-extrabold text-emerald-700 text-center mb-2 tracking-tight">Sign In</h1>
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold">Email</label>
                    <input 
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 text-base w-full rounded-xl border border-emerald-200 focus:border-emerald-400 outline-none bg-emerald-50/40 transition-all duration-200"
                    />
                    <label className="text-sm font-semibold mt-2">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 text-base w-full rounded-xl border border-emerald-200 focus:border-emerald-400 outline-none bg-emerald-50/40 transition-all duration-200"
                    />
                </div>
                <button
                    className="w-full mt-2 py-3 font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-lg"
                >
                    Login
                </button>
                <p className="mt-6 text-sm text-center">Don't have an account? <a href="#" className="underline text-emerald-600 hover:text-emerald-800 font-semibold transition-colors">Sign up here.</a></p>
            </form>
        </div>
    )
}

export default page