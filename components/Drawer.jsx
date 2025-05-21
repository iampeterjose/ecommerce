"use client";
import { navLinks } from "@/app/constants";
import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Drawer = () => {
    const pathname = usePathname();
    const { isOpen, setIsOpen, totalQuantity } = useProductStore();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevent rendering until mounted

    const toggleDrawer = () => {
        setIsOpen(); // This should be fine as long as it's called in response to an event
    };

    return (
        <>
        {/* Desktop View */}
        <div className={`hidden md:block ${isOpen ? 'w-72' : 'w-16'} fixed text-emerald-700 px-3 duration-500 min-h-screen border-r border-emerald-100 shadow-2xl bg-gradient-to-b from-emerald-50 via-white to-emerald-100 z-20`}> 
            <div className="py-3 flex justify-end">
                <button className="rounded-full p-2 hover:bg-emerald-100 transition-colors" onClick={toggleDrawer} aria-label="Toggle drawer">
                    <HiMenuAlt3 size={26} className="text-emerald-500" />
                </button>
            </div>
            <div className="mt-4 relative">
                <ul className="flex flex-col gap-3">
                    {navLinks.map((nav, i) => (
                        <motion.li 
                            key={i} 
                            className="group"
                            whileHover={{ scale: 1.06 }}
                        >
                            <Link
                                href={nav.href}
                                className={`flex items-center text-base gap-3 font-semibold p-3 rounded-xl transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-900 ${pathname === nav.href ? "bg-emerald-200 text-emerald-900 shadow-md" : ""}`}
                            >
                                <span className="text-xl">{nav.icon}</span>
                                <span style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-300 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                    {nav.title}
                                </span>
                                {nav.title === "Cart" && totalQuantity > 0 && (
                                    <span className="ml-auto px-2 py-0.5 text-xs bg-rose-500 text-white rounded-full font-bold shadow-md animate-bounce">{totalQuantity}</span>
                                )}
                                {/* Tooltip for collapsed state */}
                                <span className={`${!isOpen ? 'hidden group-hover:block bg-emerald-50 border-emerald-200 border text-emerald-700 px-2 py-1 rounded-md left-14 absolute shadow-md' : 'hidden'}`}>
                                    <span className="font-semibold">{nav.title}</span>
                                </span>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
        
        {/* Mobile View */}
        <div className="flex z-50 fixed md:hidden bg-gradient-to-b from-emerald-50 via-white to-emerald-100 text-emerald-700 border-b-2 border-emerald-100 w-full px-2 py-3 shadow-lg">
            <div className="flex justify-start gap-4">
                <button className="rounded-full p-2 hover:bg-emerald-100 transition-colors" onClick={toggleDrawer} aria-label="Open drawer">
                    <HiMenuAlt3 size={26} className="text-emerald-500" />
                </button>
                <Link href="/" className="text-lg font-extrabold tracking-tight text-emerald-700">myStore</Link>
            </div>
            <div className={`fixed inset-y-0 left-0 top-10 w-full bg-gradient-to-b from-emerald-50 via-white to-emerald-100 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 shadow-2xl`}>
                <div className="absolute top-4 right-4 flex items-center">
                    <button className="rounded-full p-1 hover:bg-emerald-100 transition-colors" onClick={toggleDrawer} aria-label="Close drawer">
                        <IoCloseCircleOutline size={30} className="text-emerald-500" />
                    </button>
                </div>
                <div className="mt-16">
                    <ul className="flex flex-col gap-3 p-4">
                        {navLinks.map((nav, i) => (
                            <motion.li 
                                key={i}
                                whileHover={{ scale: 1.06 }}
                            >
                                <Link
                                    href={nav.href}
                                    className={`flex items-center text-base gap-3 font-semibold p-3 rounded-xl transition-all duration-200 hover:bg-emerald-100 hover:text-emerald-900 ${pathname === nav.href ? "bg-emerald-200 text-emerald-900 shadow-md" : ""}`}
                                    onClick={toggleDrawer}
                                >
                                    <span className="text-xl">{nav.icon}</span>
                                    <span>{nav.title}</span>
                                    {nav.title === "Cart" && totalQuantity > 0 && (
                                        <span className="ml-auto px-2 py-0.5 text-xs bg-rose-500 text-white rounded-full font-bold shadow-md animate-bounce">{totalQuantity}</span>
                                    )}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default Drawer;
