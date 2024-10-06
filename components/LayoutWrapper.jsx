// LayoutWrapper.js
"use client";

import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer"; // Adjust the path as necessary
import Footer from "./Footer";
import useProductStore from "@/app/store/productStore";
import Cart from "./Cart";

const LayoutWrapper = ({ children }) => {
  const{ isOpen, setIsOpen } = useProductStore();


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    // Set initial state only on client-side
    handleResize();

    window.addEventListener("resize", handleResize);
    
    // Cleanup listener on unmount
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <div className="flex min-h-screen font-montserrat w-full bg-[#EEEEEE]">
      <Drawer/>
      <Cart />
      <main
        className={`flex-grow transition-all duration-500 ease-in-out ${isOpen ? 'md:ml-72' : 'md:ml-16'} p-3 md:px-10`}
      >
        {children}
        <Footer />
      </main>
    </div>
    </>
  );
};

export default LayoutWrapper;
