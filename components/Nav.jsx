"use client";
import { navLinks } from "@/app/constants";
import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion } from "framer-motion";

const Nav = () => {
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
        <div className={`hidden md:block fixed z-20 top-0 left-0 w-full border-b bg-white px-2 md:px-32 `}>
            <div className="flex items-center py-4 ">
                <div className="font-bold text-2xl cursor-pointer flex items-center font-satoshi text-customBlue2">
                    <Link href="/" className="flex justify-center items-center text-xl font-semibold pr-80">
                        <p className="text-xl">myStore</p>
                    </Link>
                </div>
                <ul className="flex gap-4 w-full">
                    {navLinks.filter(nav => nav.view === "desktop").map((nav, i) => (
                        <li key={i}
                            className={`text-customBlue2 font-semibold font-montserrat px-5 py-2 ${i === navLinks.filter(nav => nav.view === "desktop").length - 1 ? 'ml-auto border border-customOrange2 rounded-full text-customOrange2' : ''}`}
                        >
                            <Link href={nav.href}>
                                <p>{nav.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </div>

        {/* Mobile View */}
        <div className="flex z-50 fixed md:hidden bg-white text-customBlue2 border-b w-full px-2 py-3">
            <div className="flex justify-start gap-4">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleDrawer} /> <Link href="/"><h1 className="text-lg font-semibold">myStore</h1></Link>
            </div>

            <div className={`fixed inset-y-0 left-0 top-10 w-full bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="mt-16">
                    <ul className="flex flex-col gap-3 p-4">
                        {navLinks.map((nav, i) => (
                            <motion.li 
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                onHoverStart={e => {}}
                                onHoverEnd={e => {}}
                            >
                                <Link
                                    href={nav.href}
                                    className={`flex items-center text-sm gap-3 font-medium p-2 hover:shadow-slate-400 hover:shadow-sm hover:rounded-md ${pathname === nav.href ? "border shadow-sm shadow-slate-400 rounded-md" : ""}`}
                                    
                                    onClick={toggleDrawer}
                                >
                                    <span>{nav.icon}</span>
                                    <h2>{nav.title}</h2>
                                    {nav.title === "Cart" && totalQuantity > 0 && (
                                        <p className={`px-1.5 text-sm bg-red-600 text-white rounded-full`}>{totalQuantity}</p>
                                    )}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Nav