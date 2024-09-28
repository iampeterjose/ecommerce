"use client";
import { navLinks } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";

const Drawer = ({ toggleDrawer, isOpen }) => {
    const pathname = usePathname();

    return (
        <>
        {/* Desktop View */}
        <div className={`hidden md:block ${isOpen ? 'w-72' : 'w-16'} fixed text-white px-3 duration-500 min-h-screen bg-customBlue  shadow-customBlue2 shadow-md border-r-2 border-customBlue2 z-10`}>
            <div className="py-3 flex justify-end">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleDrawer} />
            </div>
            <div className="mt-4 relative">
                <ul className="flex flex-col gap-3">
                    {navLinks.map((nav, i) => (
                        <li key={i} className="group">
                            <Link
                                href={nav.href}
                                className={`flex items-center text-sm gap-3 font-medium p-2 hover:bg-customBlue2 hover:rounded-sm ${pathname === nav.href ? "bg-customBlue2 border border-white rounded-sm" : ""}`}
                            >
                                <div>{nav.icon}</div>
                                <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-300 ${!isOpen && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                    {nav.title}
                                </h2>
                                <span className={`${!isOpen ? 'opacity-0 group-hover:opacity-100 bg-white border-slate-300 border-2 text-slate-700 px-2 py-1 rounded-sm left-12 absolute' : 'hidden'}`}>
                                    <p className="font-semibold">{nav.title}</p>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        

        {/* Mobile View */}
        <div className="flex z-50 fixed md:hidden bg-customBlue text-white border-b-2 border-customBlue2 shadow-customBlue2 shadow-sm w-full px-2 py-3">
            <div className="flex justify-start gap-4">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={toggleDrawer} /> <h1 className="text-lg">eCommerce</h1>
            </div>

            <div className={`fixed inset-y-0 left-0 w-72 bg-customBlue shadow-customBlue2 shadow-md border-customBlue2 border-r-2 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-4 right-4 flex items-center">
                    <IoCloseCircleOutline size={20} className="cursor-pointer" onClick={toggleDrawer} />
                </div>
                <div className="mt-16">
                    <ul className="flex flex-col gap-3 p-4">
                        {navLinks.map((nav, i) => (
                            <li key={i}>
                                <Link
                                    href={nav.href}
                                    className={`flex items-center text-sm gap-3 font-medium p-2 hover:bg-customBlue2 hover:rounded-sm ${pathname === nav.href ? "bg-customBlue2 border-white border rounded-sm" : ""}`}
                                    
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
