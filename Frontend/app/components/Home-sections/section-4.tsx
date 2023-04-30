"use client";

import Top10Chart from '../Table';

const Section4 = () => {
  return (
    <section className='z-10 py-28 px-[5vw] flex flex-col items-center justify-center bg-neutral-200 relative mx-auto text-lg w-full'>
        <article className='z-10 md:min-h-[40rem] flex flex-row items-center gap-24 md:gap-0 md:flex-row w-full max-w-[70rem]'>
          <div className='w-full md:w-3/5 h-[40rem] overflow-hidden md:self-start'>
            <div className='flex gap-2 items-center opacity-80'>
              <h3>
                Worst{' '}
                <abbr className='decoration-black/30 underline-offset-4' title='Air Quality Index'>
                  AQI
                </abbr>{' '}
                average 2022
              </h3>
              <cite className='text-xs'>
                <a
                  className="text-blue-900"
                  href='https://www.iqair.com/world-most-polluted-countries'
                  target='_blank'
                  rel='noreferrer'>
                  (source IQAIR)
                </a>
              </cite>
            </div>
            <Top10Chart />
          </div>
          <div className= 'flex flex-col justify-center items-center text-center max-w-md h-350 ml-8 bg-white shadow rounded-md p-7'>
            <h1 className='w-full text-center text-lg font-bold pb-3'>
              Some countries are hit harder than others
            </h1>
              <p className="font-medium text-center">
                The{' '}
                <abbr className='decoration-black/30 underline-offset-4' title='World Health Organization'>
                  WHO
                </abbr>{' '}
                  target for air pollution is 0-10 µg/m³. IQ Air, which measures
                  pollution in 109 countries around the globe, considers
                  measurements above 35.5 to be unhealthy for sensitive groups,
                  levels between 55.5 and 150.4 to be unhealthy for all, and
                  anything higher is either very unhealthy (150.5-250.4) or
                  hazardous (250.5 or higher).
              </p>
          </div>
        </article>
      </section>
  )
}

export default Section4;