'use client'
import { useState, useEffect } from "react"
import Footer from "app/components/Footer"
import Navbar from "app/components/Navbar"
import UpBtn from "app/components/ScrollBtn"
import type { Metadata } from "next"
import { z } from "zod";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image"
import { type ResultSchema } from "types"
import { type APIResponseSchema } from "types"

export const metadata: Metadata = {
  title: 'Information Page'
}

const AqiData = z.object({
  data: z.object({
    aqi: z.number(),
    city: z.object({
      name: z.string(),
    }),
    time: z.object({
      iso: z.string(),
    }),
  }),
});

export type AqiData = z.infer<typeof AqiData>;
export type APIResponseSchema = z.infer<typeof APIResponseSchema>;
export type ResultSchema = z.infer<typeof ResultSchema>;


export default function Information() {
  const [cityName, setCityName] = useState('')
  const [aqiData, setAqiData] = useState<AqiData>({ data: { aqi: 0, city: { name: "" }, time: { iso: "" } } })
  const [pictures, setPictures] = useState<APIResponseSchema>({ results: [] });
  const [picture, setPicture] = useState<ResultSchema>();
  const [count, setCount] = useState(0)

  const getURLParameter = (sParam: string) => {
    const sPageURL = window.location.search.substring(1);
    const sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i]?.split("=") ?? [];
      if (sParameterName[0] === sParam) {
        return sParameterName[1] || "";
      }
    }
    return "";
  };  

  const fetchAqiData = async () => {
    const name = decodeURIComponent(getURLParameter('city'))
    name.replaceAll('%20', '-');
    setCityName(name)
    const lat = getURLParameter('lat') ?? '';
    const lng = getURLParameter('lng') ?? '';
    try {
      const res = await fetch(`http://localhost:3000/api/geolocation?lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json() as AqiData;
        setAqiData(data);
        await fetchImages(name)
      } else {
        throw new Error('Failed to fetch AQI data');
      }
    } catch (error) {
      console.error('Failed to fetch AQI data:', error);
    }
  }; 

  const fetchImages = async (name: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/unsplash?query=${name}`);
      if (res.ok) {
        const data = await res.json() as APIResponseSchema;
        console.log(data);
        setPictures(data);
      } else {
        throw new Error('Failed to fetch images');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // cycles through pictures
  const changePicture = () => {
    if (pictures && pictures.results.length > 0) {
      setCount((prevCount) => (prevCount + 1) % pictures.results.length);
    }
  };  

  // count for pictures switch
  useEffect(() => {
    if (pictures && pictures.results.length > 0) {
      setPicture(pictures.results[count]);
    }
  }, [pictures, count]);

  // event listener first load
  useEffect(() => {
    const fetchData = async () => {
      await fetchAqiData();
    };

    fetchData().catch((error) => {
      console.error("Failed to fetch data:", error);
    });
  }, []);
  
  return (
      <section className='w-full bg-neutral-50'>
        <div className='my-0 mx-auto flex flex-col px-[5vw] pt-24 pb-6 md:pt-28 md:pb-28 max-w-[70rem] min-h-screen bg-neutral-50'>
            <>
              {/* --- TITLE SECTION --- */}
              {cityName !== 'here' ? (
                <div className='flex flex-col gap-2'>
                  <h1 className=' text-3xl font-bold tracking-wider'>
                    Air quality in{' '}
                    <b className='capitalize font-bold tracking-wider'>
                      {decodeURIComponent(cityName)}
                    </b>
                  </h1>
                  <div className='flex flex-col'>
                    <p className='opacity-70'>
                      Air quality index (AQI) and other relevant air pollution
                      data in{' '}
                      <b className='capitalize font-normal'>{cityName}</b>.
                    </p>
                    <p className='opacity-70'>
                      Closest AQI station: {aqiData.data.city.name}.
                    </p>
                  </div>
                  <p className='opacity-70 text-sm mt-3'>
                  Last updated {aqiData.data.time.iso && formatDistanceToNow(new Date(aqiData.data.time.iso), { addSuffix: true })}
                  </p>
                </div>
              ) : (
                ''
              )}
              {/* --- CITY IMAGE AND AQI --- */}
              <div className='flex flex-col md:flex-row gap-6 mt-12'>
                <div className='flex flex-col gap-6 w-full md:w-1/2 overflow-hidden '>
                  <div
                    className={`flex h-fit p-4 rounded-md ${
                      aqiData.data.aqi >= 301
                        ? 'bg-[#A159FF]'
                        : aqiData.data.aqi >= 201
                        ? 'bg-[#9866F2]'
                        : aqiData.data.aqi >= 151
                        ? 'bg-[#9073E6]'
                        : aqiData.data.aqi >= 101
                        ? 'bg-[#8780D9]'
                        : aqiData.data.aqi >= 51
                        ? 'bg-[#759BBF]'
                        : aqiData.data.aqi >= 0
                        ? 'bg-[#5BC299]'
                        : 'bg-[#d96a6a]'
                    }`}>
                    <div className='flex flex-col items-center justify-center p-4 bg-black/10 rounded-md'>
                      <p>AQI</p>
                      <p>{aqiData.data.aqi}</p>
                    </div>
                    <div className='w-full text-center flex gap-1 items-center justify-center'>
                      <p className='text-md'>Aqi index is </p>
                      <p className='text-xl font-bold'>
                        {aqiData.data.aqi >= 301
                          ? 'Hazardous'
                          : aqiData.data.aqi >= 201
                          ? 'Very unhealthy'
                          : aqiData.data.aqi >= 151
                          ? 'Unhealthy'
                          : aqiData.data.aqi >= 101
                          ? 'High'
                          : aqiData.data.aqi >= 51
                          ? 'Moderate'
                          : aqiData.data.aqi >= 0
                          ? 'Good'
                          : 'No data'}
                      </p>
                    </div>
                  </div>

                  <figure
                    className={`relative h-72 md:h-full flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none ${
                      aqiData.data.aqi >= 301
                        ? 'bg-[#A159FF]'
                        : aqiData.data.aqi >= 201
                        ? 'bg-[#9866F2]'
                        : aqiData.data.aqi >= 151
                        ? 'bg-[#9073E6]'
                        : aqiData.data.aqi >= 101
                        ? 'bg-[#8780D9]'
                        : aqiData.data.aqi >= 51
                        ? 'bg-[#759BBF]'
                        : aqiData.data.aqi >= 0
                        ? 'bg-[#5BC299]'
                        : 'bg-[#d96a6a]'
                    }`} style={{ height: '24rem'}}>
                    {picture && (
                      <Image
                        src={picture.urls.regular}
                        alt={'random picture of ' + cityName}
                        priority={true}
                        fill
                        className="object-cover"
                      />
                    )}
                    <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>
                      Picture by{' '}
                      <a
                        className='underline'
                        href={picture && picture.links.html}>
                        {picture && picture.user.name}
                      </a>
                    </figcaption>
                    <button
                      onClick={changePicture}
                      className='z-10 absolute bottom-0 right-0 mb-2 mr-3 text-white'>
                      ↺
                    </button>
                  </figure>
                </div>
                {/* --- POLLUANTS ---*/}
              </div>
            </>
        </div>
      </section>
  )
}

// { results: [{ urls: { regular: ""}, links: { html: "" }, user: { name: "" } }] }