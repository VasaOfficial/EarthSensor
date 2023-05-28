'use client'
import { useState, useEffect } from "react"
import SearchBar from "../Search"
import GeoBtn from "../GeoBtn"
import Scene from "../Scene"
import getAqiData from "lib/getAqiData"
import { type AqiData } from 'types'

export default function Section1() {
  const [data, setData] = useState<AqiData[]>()
     // Sort data by AQI level
     const sortData = (data: AqiData[]) => {
      const sortedData = data
        .filter((e) => !Number.isNaN(Number(e.aqi)))
        .sort((a, b) => Number(b.aqi) - Number(a.aqi))
  
      setData(sortedData)
    }
  
    // Aqi fetch
    useEffect(() => {
      getAqiData()
        .then((res: { data: AqiData[]}) => {
          sortData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  return (
    <>
    <section className='flex items-center justify-center w-full h-[80vh] max-h-[45rem] md:max-h-[80vh] md:h-[80vh] overflow-hidden
    bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516]
    after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-3/4 after:bg-gradient-to-t after:from-[#000000] after:to-transparent after:pointer-events-none'>
      <div className='relative w-full max-w-[80rem] h-full flex flex-col md:flex-row '> 
       {/*-- CTA --*/}
      <div id="cta" className='absolute md:relative bottom-0 left-0 z-10 md:h-full w-full md:w-1/2 pl-[5vw] pr-8 sm:pr-0 md:pr-0 text-white flex items-start md:items-center pb-12 '>
        <div className='flex flex-col items-start gap-4 text-lg'>
          <h1 className='text-4xl md:text-5xl'>
            How polluted is your air?
          </h1>
          <p className='opacity-70'>
            Discover the current AQI (Air Quality Index) of the closest
            station to your location.
          </p>
          <div className='flex gap-4 relative'>
            <div className='z-50 relative h-12 flex gap-4 flex-shrink w-full sm:max-w-[16rem] bottom-0 right-0'>
              <SearchBar /> 
            </div>
            <GeoBtn />
          </div>
        </div>
      </div>
        {/*--- EARTH --*/}
        {data && (
        <div className='absolute md:relative bottom-0 md:top-0 left-0 h-[110%] md:h-full  md:min-h-full w-full md:w-1/2'>
              <div
                id='tooltip'
                className=' hidden pointer-events-none z-10 fixed flex-col gap-2 top-0 left-0 w-60 md:w-80 p-4 text-black bg-emerald-400 rounded-2xl border-solid border-black shadow-lg leading-4 invisible sm:visible
                before:block before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-[8px] before:w-0 before:h-0 before:pointer-events-none before:border-y-8 before:border-l-8 before:border-solid before:border-y-transparent before:border-l-emerald-400 before:shadow-lg'>
                <p id='tooltip-name'></p>
                <p id='tooltip-aqi' className='font-bold'></p>
                <time id='tooltip-time' className='text-sm'></time>
              </div>
             <Scene data={data} />
            </div>
             )}
      </div>  
    </section>
    </>
  )
}