// LayoutWrapper.js
"use client";

import { useState, useEffect } from "react";
import Footer from "./Footer";
import useProductStore from "@/app/store/productStore";
import Cart from "./Cart";
import Nav from "./Nav";

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
    <div className="flex min-h-screen font-montserrat w-full">
      <Nav />
      <Cart />
      <main
        className={`flex-grow px-2 md:px-32 py-2 md:py-16`}
      >
        {children}
        <Footer />
      </main>
    </div>
    </>
  );
};

export default LayoutWrapper;
