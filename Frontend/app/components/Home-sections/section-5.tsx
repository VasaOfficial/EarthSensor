"use client";

import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'app/clientLib';

const Section5 = () => {
  return (
    <>
      <section className='w-full relative flex flex-col items-center bg-white mx-auto text-lg justify-center'>
        <div className='absolute top-0 left-0 w-full h-[40%] bg-neutral-200 pointer-events-none'></div>
        <div className='relative flex flex-col gap-28 w-full max-w-[60rem]'>
          <h2 className='text-3xl w-full md:w-1/2 lg:w-2/5 self-start text-center'>
            <b className='font-serif opacity-50'>“ </b>Covid19 showed part of
            the world what it&apos;s like living with fresh air
            <b className='font-serif opacity-50'> „</b>
          </h2>
          <div className='relative md:w-4/5 self-end right-20'>
            <ReactCompareSlider
              handle={
                <ReactCompareSliderHandle
                  buttonStyle={{
                    WebkitBackdropFilter: undefined,
                    backdropFilter: undefined,
                    backgroundColor: 'white',
                    border: 0,
                    boxShadow: undefined,
                    color: '#444',
                  }}
                  linesStyle={{ opacity: 0.5 }}
                />
              }
              position={20}
              itemOne={
                <ReactCompareSliderImage
                  src='/assets/before.jpg'
                  alt='Image one'
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src='/assets/after.jpg'
                  alt='Image two'
                  className='after:absolute after:bottom-0 after:left-0 after:content-["BEFORE"] after:w-full after:h-full after:text-white'
                />
              }
            />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-6 max-w-[60rem] py-28 md:pb-40 px-[5vw] bg-white relative mx-auto text-lg'>
          <h3 className='text-3xl text-left md:text-center'>
            Lockdowns cause global air pollution to decline
          </h3>
          <p className='font-medium'>
            The global response to the COVID-19 pandemic has resulted in
            unprecedented reductions in economic activity. We find that, after
            accounting for meteorological variations, lockdown events have
            reduced the population-weighted concentration of nitrogen dioxide
            and particulate matter levels by about 60% and 31% in 34 countries,
            with mixed effects on ozone. Reductions in transportation sector
            emissions are largely responsible for the NO2 anomalies.
          </p>
        </div>
      </section>
    </>
  )
}

export default Section5;