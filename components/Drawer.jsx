"use client";
import { navLinks } from "@/app/constants";
import useProductStore from "@/app/store/productStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";

const Drawer = () => {
    const pathname = usePathname();
    const { isOpen, setIsOpen } = useProductStore();

    const toggleDrawer = () => {
        setIsOpen(); // This should be fine as long as it's called in response to an event
    };

    return (
        <>
        {/* Desktop View */}
        <div className={`hidden md:block ${isOpen ? 'w-72' : 'w-16'} fixed text-slate-700 px-3 duration-500 min-h-screen border-r border-slate-300 bg-white z-10`}>
            <div className="py-3 flex justify-end">
                <HiMenuAlt3 size={26} color="black" className="cursor-pointer" onClick={toggleDrawer} />
            </div>
            <div className="mt-4 relative">
                <ul className="flex flex-col gap-3">
                    {navLinks.map((nav, i) => (
                        <li key={i} className="group">
                            <Link
                                href={nav.href}
                                className={`flex items-center text-sm gap-3 font-medium p-2 hover:bg-slate-100 hover:rounded-sm ${pathname === nav.href ? "text-softgreen border-b-2 border-softgreen rounded-sm" : ""}`}
                            >
                                <div>{nav.icon}</div>
                                <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-300 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                    {nav.title}
                                </h2>
                                <span className={`${!isOpen ? 'hidden group-hover:block bg-white border-softgreen border text-slate-700 px-2 py-1 rounded-md left-12 absolute' : 'hidden'}`}>
                                    <p className="font-semibold">{nav.title}</p>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        

        {/* Mobile View */}
        <div className="flex z-50 fixed md:hidden bg-white text-slate-700 border-b border-slate-300 w-full px-2 py-3">
            <div className="flex justify-start gap-4">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleDrawer} /> <h1 className="text-lg font-semibold">eCommerce</h1>
            </div>

            <div className={`fixed inset-y-0 left-0 top-10 w-full bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-4 right-4 flex items-center">
                    <IoCloseCircleOutline size={20} className="cursor-pointer" onClick={toggleDrawer} />
                </div>
                <div className="mt-16">
                    <ul className="flex flex-col gap-3 p-4">
                        {navLinks.map((nav, i) => (
                            <li key={i}>
                                <Link
                                    href={nav.href}
                                    className={`flex items-center text-sm gap-3 font-medium p-2 hover:bg-slate-100 hover:rounded-sm ${pathname === nav.href ? "text-softgreen border-b border-softgreen" : ""}`}
                                    
                                    onClick={toggleDrawer}
                                >
                                    <div>{nav.icon}</div>
                                    <h2>{nav.title}</h2>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default Drawer;
