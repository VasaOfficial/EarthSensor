"use client";

import { useState, useEffect } from "react";
import Image from "next/image"

const UpBtn = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button 
        id='scroll-to-top'
        className={`z-50 fixed bottom-4 right-4 w-12 h-12 text-xl bg-emerald-400 text-black p-2 rounded-full leading-0 shadow-md transition-all hover:scale-105`}
        onClick={handleClick}
        style={{ display: scrollPosition > 500 ? "block" : "none" }}>
        <Image src='/assets/up.svg' alt='scroll to top icon' height={50} width={50}/>
    </button>
  )
}

export default UpBtn;


