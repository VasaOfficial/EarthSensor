import Search from "../search"
import Image from "next/image"
import Location from 'public/assets/location.png'
import Map3d from "../Earth";
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Section1() {
  return (
    <section id="hero" className='flex items-center justify-center w-full h-[80vh] max-h-[45rem] md:max-h-[80vh] md:h-[80vh] overflow-hidden
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
            <div id='search' className='z-50 relative h-12 flex gap-4 flex-shrink w-full sm:max-w-[16rem] bottom-0 right-0'>
              <Search />
            </div>
            <button aria-label='geo location' className='leading-[0] opacity-90 transition-all hover:scale-110'>
                  <Image aria-hidden='true'
                    src={Location}
                    alt='geo location'
                    width={50}
                    height={50}
                  />
                </button>
          </div>
        </div>
      </div>
        {/*--- EARTH --*/}
        <div className='absolute md:relative bottom-0 md:top-0 left-0 h-[110%] md:h-full  md:min-h-full w-full md:w-1/2 mt-20'>
            <Map3d />
        </div>
      </div>  
    </section>
  )
}
