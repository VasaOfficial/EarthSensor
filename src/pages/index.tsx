import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Footer from "~/components/Footer";
import Section1 from "~/components/section-1";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EarthSensor</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2dd4bf] to-[#0f766e]">
        <Section1 />
        <Link href='/information'>GO NOW</Link>
      </main>
      <Footer />
    </>
  );
};

export default Home;
