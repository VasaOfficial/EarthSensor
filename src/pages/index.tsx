import { type NextPage } from "next";
import Head from "next/head";

import Navbar from "~/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>EarthScanner</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Find the quality of the air of the city or country" />
        <meta name="keywords" content="AQI, Air Quality, Weather" />
        <meta name="author" content="Vasilije Pleskonjic" />
        <link rel="apple-touch-icon" sizes="180x180" href="@/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="~/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="~/favicon/favicon-16x16.png" />
        <link rel="manifest" href="@/favicon/site.webmanifest" />
        <link rel="mask-icon" href="@/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2dd4bf] to-[#0f766e]">
        <Navbar />
        <h1>Hello World</h1>
      </main>
    </>
  );
};

export default Home;
