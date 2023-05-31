'use client'

import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Section1 from "./components/Home-sections/section-1";
import Section2 from "./components/Home-sections/section-2";
import Section3 from "./components/Home-sections/section-3";
import Section4 from "./components/Home-sections/section-4";
import Section5 from "./components/Home-sections/section-5";
import UpBtn from "./components/ScrollBtn";
import Navbar from "./components/Navbar";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowNavbar(scrollPosition >= 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <main className="flex flex-col">
        <Navbar className={showNavbar ? "navbar navbar-show" : "navbar"} />
        <Section1 /> 
        <Section2 />  
        <Section3 />  
        <Section4 />
        <Section5 />
      </main>
      <footer>
       <Footer />
      </footer>
      <UpBtn /> 
    </>
  );
}
