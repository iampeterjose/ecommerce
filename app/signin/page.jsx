"use client";   
import { useState } from "react";

const page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <form className="flex flex-col w-[375px] h-[500px] bg-lightBg p-4 gap-y-4 text-customBlue2 shadow-lg shadow-lightBg2 border-2 rounded-md">
                    <h1 className="text-xl font-semibold">
                        Sign In
                    </h1>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm">Email: </label>
                        <input 
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 text-base w-full rounded-md"
                        />
                        <label className="text-sm mt-2">Password: </label>
                        <input 
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 text-base w-full rounded-md"
                        />
                        <button
                            className="w-full mt-4 p-2 font-semibold bg-customOrange2
                             text-white rounded-md hover:bg-orange-600"
                        >
                            Login
                        </button>
                        <p className="mt-10 text-sm">Don't have an account? <span className="underline text-blue-500 hover:cursor-pointer">Sign up here.</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page