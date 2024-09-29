// LayoutWrapper.js
"use client";

import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer"; // Adjust the path as necessary
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);


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
    <div className="flex min-h-screen font-sans">
      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
      <main
        className={`flex-grow bg-slate-100 transition-all duration-500 ease-in-out ${isOpen ? 'md:ml-72' : 'md:ml-16'}`}
        onClick={()=>{isMobile && setIsOpen(false)}}
      >
        {children}
      </main>
    </div>
    <Footer />
    </>
  );
};

export default LayoutWrapper;
