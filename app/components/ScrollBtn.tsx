"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const UpBtn = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setIsButtonVisible(currentPosition > 500); // Use currentPosition directly
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
      id="scroll-to-top"
      className={`z-50 fixed bottom-4 right-4 w-12 h-12 text-xl bg-emerald-400 text-black p-2 rounded-full leading-0 shadow-md transition-all hover:scale-105`}
      onClick={handleClick}
      style={{
        opacity: isButtonVisible ? 1 : 0,
        transform: `translateY(${isButtonVisible ? "0" : "20px"})`,
        transition: "opacity 0.5s, transform 0.5s",
        pointerEvents: isButtonVisible ? "auto" : "none",
      }}
    >
      <Image src="/assets/up.svg" alt="scroll to top icon" height={50} width={50} />
    </button>
  );
};

export default UpBtn;
