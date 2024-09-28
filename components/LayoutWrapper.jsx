// LayoutWrapper.js
"use client";

import { useState } from "react";
import Drawer from "@/components/Drawer"; // Adjust the path as necessary
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <>
    <div className="flex min-h-screen font-sans">
      <Drawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
      <main
        className={`flex-grow transition-all duration-500 ease-in-out ${
          isOpen ? 'md:ml-72' : 'md:ml-16'
        }`}
      >
        {children}
      </main>
    </div>
    <Footer />
    </>
  );
};

export default LayoutWrapper;
