"use client";
import { navLinks } from "@/app/constants";
import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
    const pathname = usePathname();
    const { isOpen, setIsOpen, totalQuantity } = useProductStore();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const toggleDrawer = () => setIsOpen();
    const closeDrawer = () => isOpen && setIsOpen();

    return (
        <>
        {/* Modern Emerald NavBar */}
        <nav className="fixed z-30 top-0 left-0 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 shadow-lg h-16 flex items-center px-4 md:px-16 lg:px-32">
            {/* Logo */}
            <Link href="/" className="flex items-center text-2xl font-extrabold font-satoshi text-white tracking-tight mr-10">
                <span className="drop-shadow">MyStore</span>
            </Link>
            {/* Nav Links */}
            <ul className="hidden md:flex gap-2 flex-1 justify-center">
                {navLinks.filter(nav => nav.view === "desktop").map((nav, i) => (
                    <li key={i}
                        className={`px-5 py-2 rounded-full font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-all duration-150 text-base tracking-wide shadow-sm ${pathname === nav.href ? 'bg-white/20 text-white font-bold shadow-md' : ''}`}
                    >
                        <Link href={nav.href} className="flex items-center gap-2">
                            {nav.icon && <span>{nav.icon}</span>}
                            <span>{nav.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Right Side: Cart, Sign In & Profile */}
            <div className="flex items-center gap-4 ml-auto">
                <Link href="/cart" className="relative flex items-center group">
                    <FiShoppingCart size={22} className="text-white group-hover:text-emerald-100 transition-colors" />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center animate-bounce shadow-lg">{totalQuantity}</span>
                    )}
                </Link>
                <Link href="/signin" className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-white/90 text-emerald-700 text-sm font-bold shadow hover:bg-white transition-colors">Sign In</Link>
                <Link href="/account" className="flex items-center"><FiUser size={22} className="text-white" /></Link>
            </div>
            {/* Mobile Hamburger */}
            <button className="md:hidden ml-2 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors" onClick={toggleDrawer} aria-label="Open menu">
                <HiMenuAlt3 size={26} className="text-white" />
            </button>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
        {isOpen && (
            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 bg-black/40"
                onClick={closeDrawer}
            >
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white w-4/5 max-w-xs h-full shadow-2xl p-7 flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-10">
                        <Link href="/" className="text-xl font-extrabold font-satoshi text-emerald-600 tracking-tight" onClick={closeDrawer}>MyStore</Link>
                        <button onClick={closeDrawer} aria-label="Close menu" className="p-1 rounded-full hover:bg-emerald-50"><FiX size={26} /></button>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((nav, i) => (
                            <li key={i}>
                                <Link
                                    href={nav.href}
                                    className={`flex items-center gap-3 text-base font-semibold p-3 rounded-xl transition-all duration-150 ${pathname === nav.href ? "bg-emerald-100 text-emerald-700 shadow" : "hover:bg-emerald-50 text-emerald-700"}`}
                                    onClick={closeDrawer}
                                >
                                    {nav.icon && <span>{nav.icon}</span>}
                                    <span>{nav.title}</span>
                                    {nav.title === "Cart" && totalQuantity > 0 && (
                                        <span className="ml-auto bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center animate-bounce shadow">{totalQuantity}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.aside>
        )}
        </AnimatePresence>
        </>
    );
}

export default Nav;