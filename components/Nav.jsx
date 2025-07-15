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
        <nav className="fixed z-50 top-0 left-0 w-full bg-[#1976D2] shadow-lg h-16 flex items-center px-4 md:px-16 lg:px-32 select-none border-b border-[#1565C0]">
            {/* Logo */}
            <Link href="/" className="flex items-center text-2xl font-extrabold font-satoshi text-white tracking-tight mr-10 drop-shadow-lg relative z-10">
                <span>MyStore</span>
            </Link>
            {/* Nav Links */}
            <ul className="hidden md:flex gap-2 flex-1 justify-center relative z-10">
                {navLinks.filter(nav => nav.view === "desktop").map((nav, i) => (
                    <li key={i}
                        className={`px-5 py-2 rounded-full font-semibold text-white hover:bg-[#1565C0] hover:text-white transition-all duration-150 text-base tracking-wide shadow-sm relative
                            ${pathname === nav.href ? 'bg-white text-[#1976D2] font-extrabold shadow-lg scale-105 ring-2 ring-[#FF6F00]/60 ring-offset-2 ring-offset-[#F5F5F5]' : ''}`}
                    >
                        <Link href={nav.href} className="flex items-center gap-2 relative z-10">
                            {nav.icon && <span className="text-[#1976D2]">{nav.icon}</span>}
                            <span>{nav.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* Right Side: Cart, Sign In & Profile */}
            <div className="flex items-center gap-4 ml-auto relative z-10">
                <Link href="/cart" className="relative flex items-center group">
                    <FiShoppingCart size={22} className="text-white group-hover:text-[#FF6F00] transition-colors" />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#FF6F00] text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center animate-bounce shadow-lg">{totalQuantity}</span>
                    )}
                </Link>
                <Link href="/account" className="flex items-center"><FiUser size={22} className="text-white" /></Link>
                <Link href="/signin" className="flex md:hidden items-center px-4 py-1.5 rounded-full bg-white text-[#1976D2] text-sm font-bold shadow hover:bg-[#F5F5F5] transition-colors">Sign In</Link>
                <Link href="/signin" className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-white text-[#1976D2] text-sm font-bold shadow hover:bg-[#F5F5F5] transition-colors">Sign In</Link>
            </div>
            {/* Mobile Hamburger */}
            <button className="md:hidden ml-2 p-2 rounded-full bg-white hover:bg-[#F5F5F5] transition-colors relative z-10" onClick={toggleDrawer} aria-label="Open menu">
                <HiMenuAlt3 size={26} className="text-[#1976D2]" />
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
                    className="bg-white w-4/5 max-w-xs h-full shadow-xl p-7 flex flex-col border-r border-[#F5F5F5]"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-10">
                        <Link href="/" className="text-xl font-extrabold font-satoshi text-[#1976D2] tracking-tight" onClick={closeDrawer}>MyStore</Link>
                        <button onClick={closeDrawer} aria-label="Close menu" className="p-1 rounded-full hover:bg-[#F5F5F5]"><FiX size={26} className="text-[#1976D2]" /></button>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((nav, i) => (
                            <li key={i}>
                                <Link
                                    href={nav.href}
                                    className={`flex items-center gap-3 text-base font-semibold p-3 rounded-full transition-all duration-150 ${pathname === nav.href ? "bg-[#F5F5F5] text-[#1976D2] font-extrabold shadow scale-105 ring-2 ring-[#FF6F00]/60 ring-offset-2 ring-offset-white" : "hover:bg-[#F5F5F5] text-[#1976D2]"}`}
                                    onClick={closeDrawer}
                                >
                                    {nav.icon && <span className="text-[#1976D2]">{nav.icon}</span>}
                                    <span>{nav.title}</span>
                                    {nav.title === "Cart" && totalQuantity > 0 && (
                                        <span className="ml-auto bg-[#FF6F00] text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center animate-bounce shadow">{totalQuantity}</span>
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