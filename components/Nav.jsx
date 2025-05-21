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
        <nav className="fixed z-50 top-0 left-0 w-full bg-white/60 backdrop-blur-xl shadow-lg h-16 flex items-center px-4 md:px-16 lg:px-32 select-none border-b border-emerald-100/40">
            {/* Glassy Emerald Accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-emerald-300/10 blur-[2px]" />
            </div>
            {/* Logo */}
            <Link href="/" className="flex items-center text-2xl font-extrabold font-satoshi text-emerald-700 tracking-tight mr-10 drop-shadow-lg relative z-10">
                <span>MyStore</span>
            </Link>
            {/* Nav Links */}
            <ul className="hidden md:flex gap-2 flex-1 justify-center relative z-10">
                {navLinks.filter(nav => nav.view === "desktop").map((nav, i) => (
                    <li key={i}
                        className={`px-5 py-2 rounded-full font-semibold text-emerald-800/90 hover:bg-emerald-100/60 hover:text-emerald-900 transition-all duration-150 text-base tracking-wide shadow-sm relative
                            ${pathname === nav.href ? 'bg-gradient-to-r from-emerald-400/80 to-emerald-600/80 text-white font-extrabold shadow-lg scale-105 ring-2 ring-emerald-300/60 ring-offset-2 ring-offset-white before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-[2px] before:z-0' : ''}`}
                    >
                        <Link href={nav.href} className="flex items-center gap-2 relative z-10">
                            {nav.icon && <span>{nav.icon}</span>}
                            <span>{nav.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Right Side: Cart, Sign In & Profile */}
            <div className="flex items-center gap-4 ml-auto relative z-10">
                <Link href="/cart" className="relative flex items-center group">
                    <FiShoppingCart size={22} className="text-emerald-700 group-hover:text-emerald-900 transition-colors" />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center animate-bounce shadow-lg">{totalQuantity}</span>
                    )}
                </Link>
                {/* Sign In button for small screens */}
                <Link href="/account" className="flex items-center"><FiUser size={22} className="text-emerald-700" /></Link>
                <Link href="/signin" className="flex md:hidden items-center px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-bold shadow hover:bg-emerald-200 transition-colors">Sign In</Link>
                <Link href="/signin" className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-bold shadow hover:bg-emerald-200 transition-colors">Sign In</Link>
            </div>
            {/* Mobile Hamburger */}
            <button className="md:hidden ml-2 p-2 rounded-full bg-emerald-100/60 hover:bg-emerald-200/80 transition-colors relative z-10" onClick={toggleDrawer} aria-label="Open menu">
                <HiMenuAlt3 size={26} className="text-emerald-700" />
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
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                onClick={closeDrawer}
            >
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="relative bg-white/70 backdrop-blur-xl w-4/5 max-w-xs h-full shadow-2xl p-7 flex flex-col rounded-r-3xl border-r border-emerald-100/60 overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Emerald glassy accent */}
                    <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-200/30 rounded-full blur-2xl z-0" />
                    <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-400/20 rounded-full blur-2xl z-0" />
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <Link href="/" className="text-xl font-extrabold font-satoshi text-emerald-600 tracking-tight" onClick={closeDrawer}>MyStore</Link>
                        <button onClick={closeDrawer} aria-label="Close menu" className="p-1 rounded-full hover:bg-emerald-50"><FiX size={26} /></button>
                    </div>
                    <ul className="flex flex-col gap-3 relative z-10">
                        {navLinks.map((nav, i) => (
                            <li key={i}>
                                <Link
                                    href={nav.href}
                                    className={`flex items-center gap-3 text-base font-semibold p-3 rounded-xl transition-all duration-150 ${pathname === nav.href ? "bg-gradient-to-r from-emerald-400/80 to-emerald-600/80 text-white font-extrabold shadow scale-105 ring-2 ring-emerald-300/60 ring-offset-2 ring-offset-white" : "hover:bg-emerald-50 text-emerald-700"}`}
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