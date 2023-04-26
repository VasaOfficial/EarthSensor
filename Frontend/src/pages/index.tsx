import { useState, useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import Footer from "~/components/Footer";
import Section1 from "~/components/Home-sections/section-1";
import Section2 from "~/components/Home-sections/section-2";
import Section3 from "~/components/Home-sections/section-3";
import Section4 from "~/components/Home-sections/section-4";
import Section5 from "~/components/Home-sections/section-5";
import UpBtn from "~/components/ScrollBtn";

const Home: NextPage = () => {
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

  return (
    <>
      <Head>
        <title>EarthSensor</title>
      </Head>
      <main className="flex flex-col">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </main>
      <footer>
        <Footer />
      </footer>
      {scrollPosition > 500 && <UpBtn />}
    </>
  );
};

export default Home;
