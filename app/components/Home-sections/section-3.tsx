import Image from "next/image"
import Pollution from 'public/assets/industry-polution.jpg'

export default function Section3() {
  return (
    <section  className='relative w-full flex items-center justify-center py-28 bg-white'>
      <div className='z-10 relative flex items-center justify-center w-[90vw] h-[25rem] sm:h-[40rem] max-w-[80rem] margin-auto'>
        <div className='w-10/12 h-full sm:h-5/6 absolute left-0 top-0 '>
          <figure className='relative w-full h-full max-h-full max-w-full '>
            <Image
              src={Pollution}
              alt='air pollution'
              fill={true}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              quality={100}
            />
          </figure>
        </div>
        <div className='absolute -bottom-16 sm:bottom-8 md:bottom-16 right-0 md:w-1/2 w-10/12 bg-emerald-400 flex flex-col gap-4 sm:gap-8 items-center justify-between py-6 px-8 shadow-xl'>
          <p className='leading-8 leading font-medium text-lg sm:text-xl self-start sm:mr-8 mr-4'>
            Air pollution is one of the world’s leading risk factors for health.
            <br />
            It is attributed to 11.65% of death globally, which equates to
            millions of people each year.
          </p>
          <cite className='self-end ml-8 no-underline '>
            <a
              href='https://ourworldindata.org/air-pollution'
              target='_blank'
              className="text-blue-900"
              rel='noreferrer'>
              ourworldindata.org
            </a>
          </cite>
        </div>
      </div>
      <figure className='absolute left-0 top-0 w-full h-full bg-blue text-blue opacity-20 pointer-events-none'>
      </figure>
    </section>
  )
}
