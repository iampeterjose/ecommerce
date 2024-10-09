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
        <div className="flex flex-col py-16 md:py-5 min-h-screen">
            {loading ? (
                <>
                    <Skeleton 
                        height={30} 
                        width={200} 
                        className="mb-4" 
                        baseColor="#e0e0e0" // Change this to your desired base color
                        highlightColor="#f0f0f0" // Change this to your desired highlight color
                    />
                    <Skeleton 
                        count={3} 
                        className="mb-4" 
                        baseColor="#e0e0e0" 
                        highlightColor="#f0f0f0"
                    />
                </>
            ) : (
                <>
                    <h1 className="text-2xl text-customBlue2 font-semibold">
                        My Account
                    </h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
                        Unde rerum tempore nam mollitia, qui amet provident architecto ducimus, doloremque, nihil ad? <br />
                        Fuga iste deleniti animi, quaerat sed modi illo quisquam?
                    </p>
                </>
            )}
        </div>
    );
}

export default Page;
