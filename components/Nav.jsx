"use client";
import Link from "next/link";
import Drawer from "./Drawer";
import { useState } from "react";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDrawer =()=> {
        setIsOpen(prev => !prev);
    }

    return (
        <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
    )
}

export default Nav