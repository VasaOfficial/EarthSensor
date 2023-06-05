'use client'
import { useState, useEffect } from "react"
import Footer from "app/components/Footer"
import Navbar from "app/components/Navbar"
import UpBtn from "app/components/ScrollBtn"
import type { Metadata } from "next"
import { z } from "zod";
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Information Page'
}

const AqiData = z.object({
  data: z.object({
    city: z.object({
      name: z.string(),
    }),
    time: z.object({
      iso: z.string(),
    }),
  }),
});

export type AqiData = z.infer<typeof AqiData>;

export default function Information() {
  const [cityName, setCityName] = useState('')
  const [aqiData, setAqiData] = useState<AqiData | undefined>(undefined);
  
  const getURLParameter = (sParam: string) => {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i]?.split("=") ?? [];
      if (sParameterName[0] === sParam) {
        return sParameterName[1] || ""; // Return an empty string if the value is undefined
      }
    }
    return "";
  };  

  const fetchAqiData = async () => {
    const name = decodeURIComponent(getURLParameter('city'))
    name.replace('%20', '-')
    setCityName(name)
    const lat = getURLParameter('lat') ?? '';
    const lng = getURLParameter('lng') ?? '';
    try {
      const res = await fetch(`http://localhost:3000/api/geolocation?lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json() as AqiData;
        setAqiData(data);
  
      } else {
        throw new Error('Failed to fetch AQI data');
      }
    } catch (error) {
      console.error('Failed to fetch AQI data:', error);
    }
  };

   // event listener first load
   useEffect(() => {
    const fetchData = async () => {
      await fetchAqiData();
    };
  
    fetchData().catch((error) => {
      console.error("Failed to fetch AQI data:", error);
    });
  }, []);  
  
  return (
    <>
      <Navbar className="navbar"/>
    <main>
      <section className='w-full bg-neutral-50'>
        <div className='my-0 mx-auto flex flex-col px-[5vw] pt-24 pb-6 md:pt-28 md:pb-28 max-w-[70rem] min-h-screen bg-neutral-50'>
          {/* --- TITLE SECTION --- */}
          <div className='flex flex-col gap-2'>
          <h1 className=' text-3xl font-bold tracking-wider'>
            Air quality in{' '}
            <b className='capitalize font-bold tracking-wider'>{cityName}</b>
          </h1>
          <div className='flex flex-col'>
            <p className='opacity-70'>
              Air quality index (AQI) and other relevant air pollution data in{' '}
              <b className='capitalize font-normal'>{cityName}</b>.
            </p>
            <p className='opacity-70'>
              Closest AQI station: {aqiData?.data.city.name}.
            </p>
          </div>
            <p className='opacity-70 text-sm mt-3'>
            Last updated {aqiData?.data?.time?.iso && formatDistanceToNow(new Date(aqiData.data.time.iso), { addSuffix: true })} ago
            </p>
          </div>
          {/* --- CITY IMAGE AND AQI --- */}
          <div className='flex flex-col md:flex-row gap-6 mt-12'>
            <div className='flex flex-col gap-6 w-full md:w-1/2 overflow-hidden '>
            <div className={`flex h-fit p-4 rounded-md`}>
              <div className='flex flex-col items-center justify-center p-4 bg-black/10 rounded-md'>
                <p>AQI</p>
                <p>aqi data</p>
              </div>
              <div className='w-full text-center flex gap-1 items-center justify-center'>
                <p className='text-md'>Aqi index is </p>
                <p className='text-xl font-bold'>
                </p>
              </div>
            </div>
            </div>
          </div>
          <figure id='search-picture'className={`relative h-64 md:h-full flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none`}>
            {/* <Image /> */}
            <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>Picture by{' '}
              <a className='underline' >
              </a>
            </figcaption>
            <button
              className='z-10 absolute bottom-0 right-0 mb-2 mr-3 text-white'>
              ↺
            </button>
          </figure>
        </div>
      </section>
    </main>
    <footer>
      <Footer />
    </footer>
      <UpBtn />
    </>
  )
}
