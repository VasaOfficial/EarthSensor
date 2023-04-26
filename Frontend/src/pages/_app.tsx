import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import "~/styles/globals.css";
import NextNProgress from 'nextjs-progressbar';
import { NextUIProvider } from '@nextui-org/react';
import 'mapbox-gl/dist/mapbox-gl.css';

// favicon imports
import Favicon32 from 'public/favicon/favicon-32x32.png'
import Favicon16 from 'public/favicon/favicon-16x16.png'
import AppleTouch from 'public/favicon/apple-touch-icon.png'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Find the quality of the air of the city or country" />
        <meta name="keywords" content="AQI, Air Quality, Weather" />
        <meta name="author" content="Vasilije Pleskonjic" />
        <link rel="apple-touch-icon" sizes="180x180" href={AppleTouch.src} />
        <link rel="icon" type="image/png" sizes="32x32" href={Favicon32.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={Favicon16.src} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <NextNProgress color="#84cc16" height={4}/>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  )
};

export default MyApp;
