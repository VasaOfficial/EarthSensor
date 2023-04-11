import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Footer from "~/components/Footer";
import Section1 from "~/components/Home-sections/section-1";
import Section2 from "~/components/Home-sections/section-2";
import Section3 from "~/components/Home-sections/section-3";
import Section4 from "~/components/Home-sections/section-4";
import Section5 from "~/components/Home-sections/section-5";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EarthSensor</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2dd4bf] to-[#0f766e]">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Link href='/information'>GO NOW</Link>
      </main>
      <Footer />
    </>
  );
};

export default Home;
