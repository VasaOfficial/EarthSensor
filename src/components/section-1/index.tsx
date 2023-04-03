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
            station to your city.
          </p>
        </div>
      </div>
        {/*--- EARTH --*/}
        <div className="globe"></div>
      </div>  
    </section>
  )
}
