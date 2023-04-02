import { type NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/Footer";
import Favicon from 'public/favicon/favicon-32x32.png'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EarthSensor</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2dd4bf] to-[#0f766e]">
        <h1>Hello World</h1>
      </main>
      <Footer />
    </>
  );
};

export default Home;
