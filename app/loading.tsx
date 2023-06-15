import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
      <section className='w-full bg-neutral-50'>
      <div className='my-0 mx-auto flex flex-col px-[5vw] pt-24 pb-6 md:pt-28 md:pb-28 max-w-[70rem] min-h-screen bg-neutral-50'>
          <>
              <div className='flex flex-col gap-2'>{<Skeleton count={3} />}</div>
            <div className='flex flex-col md:flex-row gap-6 mt-12'>
              <div className='flex flex-col gap-6 w-full md:w-1/2 overflow-hidden '>
                <div className={`flex h-fit p-4 rounded-md`}>{<Skeleton width={456} height={112} />}</div>
                <figure
                  className={`relative h-72 md:h-full flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none`}>
                  {<Skeleton width={456} height={400} />}
                </figure>
              </div>
              <div className='flex flex-col gap-6 w-full h-fit md:w-1/2'>{<Skeleton width={480} height={590}/>}</div>
            </div>
          </>
      </div>
    </section>
  )
}