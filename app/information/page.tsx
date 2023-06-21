'use client'
import { useState, useEffect, useCallback } from "react"
import type { Metadata } from "next"
import { usePathname, useSearchParams } from "next/navigation";
import { type z } from "zod";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image"
import { type AqiDataSchema, type ResultSchema, type APIResponseSchema, type WeatherData, type Coordinates} from "types";

import Footer from "app/components/Footer";
import UpBtn from "app/components/ScrollBtn";
import Chart from "app/components/Chart";
import Weather from "app/components/Weather";
import AqiMap from "app/components/AqiMap";
import RandomFacts from "app/components/RandomFacts";
import Loading from "app/loading";
import Navbar from "app/components/Navbar";

export const metadata: Metadata = {
  title: 'Information Page'
}

export type APIResponseSchema = z.infer<typeof APIResponseSchema>;
export type ResultSchema = z.infer<typeof ResultSchema>;

export const polluants: { [key: string]: string } = {
  no2: 'NO2',
  pm25: 'PM2.5',
  pm10: 'PM10',
  o3: 'O3',
  so2: 'SO2',
  co: 'CO',
};

export default function Information() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [cityName, setCityName] = useState('');
  const [aqiData, setAqiData] = useState<AqiDataSchema | null>(null);
  const [pictures, setPictures] = useState<APIResponseSchema | null>(null);
  const [picture, setPicture] = useState<ResultSchema>();
  const [count, setCount] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [refreshMap, setRefreshMap] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const url = `${pathname}?${searchParams}`;

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

  const fetchAqiData = useCallback(async () => {
    setRefreshMap(true)
    const name = decodeURIComponent(getURLParameter('city'))
    name.replaceAll('%20', '-');
    setCityName(name)
    const lat = getURLParameter('lat');
    const lng = getURLParameter('lng');
    try {
      const res = await fetch(`http://localhost:3000/api/geolocation?lat=${lat}&lng=${lng}`);
      if (res.ok) {
        const data = await res.json() as AqiDataSchema;
        setAqiData(data);
        setRefreshMap(false)
        await fetchImages(name)
        await fetchWeather(lat, lng)
        setCoordinates({ lat: Number(lat), lon: Number(lng) })
      } else {
        throw new Error('Failed to fetch AQI data');
      }
    } catch (error) {
      console.error('Failed to fetch AQI data:', error);
    }
  }, []);

  const fetchImages = async (name: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/unsplash?query=${name}`);
      if (res.ok) {
        const images = await res.json() as APIResponseSchema;
        setPictures(images);
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

  const filterPolluants = (item: string): boolean => {
    for (const key in polluants) {
      if (item === key) return true;
    }
    return false;
  };  

  const fetchWeather = async (lat: string, lng: string) => {
    if (lat && lng) {
      try {
        const res = await fetch(`http://localhost:3000/api/weather?lat=${lat}&lng=${lng}`);
        if (res.ok) {
          const data = await res.json() as WeatherData;
          setWeatherData(data);
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    }
  }

  // event listener first load
  useEffect(() => {
    const fetchData = async () => {
      await fetchAqiData();
    };

    fetchData().catch((error) => {
      console.error("Failed to fetch data:", error);
    });
  }, [fetchAqiData, url]);
  
  return (
      <section className='w-full bg-neutral-50'>
        <Navbar className={"navbar navbar-show"} />
        <div className='my-0 mx-auto flex flex-col px-[5vw] pt-24 pb-6 md:pt-28 md:pb-28 max-w-[70rem] min-h-screen bg-neutral-50'>
        {aqiData && aqiData.status === 'ok' ? (
            <>
              {/* --- TITLE SECTION --- */}
              {cityName !== 'here' ? (
                <div className='flex flex-col gap-2'>
                  <h1 className=' text-3xl font-bold tracking-wider'>
                    Air quality in{' '}
                    <b className='capitalize font-bold tracking-wider'>{decodeURIComponent(cityName)}</b>
                  </h1>
                  <div className='flex flex-col'>
                    <p className='opacity-70'>
                      Air quality index (AQI) and other relevant air pollution
                      data in{' '}
                      <b className='capitalize font-normal'>{cityName}</b>.
                    </p>
                    <p className='opacity-70'>Closest AQI station: {aqiData.data.city.name}.</p>
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
                  <div className={`flex h-fit p-4 rounded-md ${
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
                    className={`relative h-64 md:h-full flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none ${
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
                    {picture && (
                      <Image
                        src={picture.urls.regular}
                        alt={'random picture of ' + cityName}
                        priority={true}
                        fill={true}
                        sizes="(max-width: 460px) 100vw, (max-width: 560px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>
                      Picture by{' '}
                      <a className='underline' href={picture && picture.links.html}>
                        {picture && picture.user.name}
                      </a>
                    </figcaption>
                    <button onClick={changePicture}
                    className='z-10 absolute bottom-0 right-0 mb-2 mr-3 text-white'>
                    ↺
                    </button>
                  </figure>
                </div>
                {/* --- POLLUANTS ---*/}
                <div className='flex flex-col gap-6 w-full h-fit md:w-1/2'>
                  {aqiData.data.forecast && aqiData.data.forecast.daily && (
                    <div className='flex flex-col gap-4 p-4 w-full bg-neutral-200 rounded-md'>
                      <h3 className='w-full text-center opacity-70 text-lg'>Polluants</h3>
                      {Object.keys(aqiData.data.forecast.daily)
                        .filter(filterPolluants)
                        .sort()
                        .map((keyName, index) => {
                          const data = aqiData.data.forecast.daily[keyName];
                          const polluantData = polluants[keyName];
                          const currentIaqi =
                          aqiData.data.iaqi[keyName]
                            ? aqiData.data.iaqi[keyName]?.v
                            : aqiData.data.forecast.daily[keyName]?.[0]?.avg;
                      return (
                        <Chart
                        key={`${keyName}${index}`}
                        data={data}
                        name={polluantData || ''}
                        currentIaqi={currentIaqi}
                      />
                    );
                  })}
                    </div>
                  )}
                  <div id='tooltip'className='z-50 fixed hidden w-64 text-sm p-2 rounded-md top-0 left-0 backdrop-blur border-solid border-black shadow-lg pointer-events-none text-black bg-emerald-400 leading-4'></div>
                </div>
              </div>
              {/* --- WEATHER ---*/}
              <Weather weatherData={weatherData} />
              {!refreshMap && (
                <AqiMap coordinates={coordinates} />
              )}
              <RandomFacts
                bg={
                  aqiData.data.aqi >= 301
                    ? 'bg-[#A159FF]/50'
                    : aqiData.data.aqi >= 201
                    ? 'bg-[#9866F2]/50'
                    : aqiData.data.aqi >= 151
                    ? 'bg-[#9073E6]/50'
                    : aqiData.data.aqi >= 101
                    ? 'bg-[#8780D9]/50'
                    : aqiData.data.aqi >= 51
                    ? 'bg-[#759BBF]/50'
                    : aqiData.data.aqi >= 0
                    ? 'bg-[#5BC299]/50'
                    : 'bg-[#d96a6a]/50'
                }
              />
            </>
            )  : (
              <Loading />
            )}
        </div>
        <Footer />
        <UpBtn />
      </section>
  )
}