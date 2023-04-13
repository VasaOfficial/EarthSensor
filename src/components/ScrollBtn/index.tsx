import Image from "next/image"

export default function UpBtn() {
  return (
    <button
        id='scroll-to-top'
        className={`z-50 fixed bottom-4 right-4 w-12 h-12 text-xl bg-emerald-400 text-black p-2 rounded-full leading-0 shadow-md transition-all hover:scale-105`}>
        <Image src='/assets/up.svg' alt='scroll to top icon' height={50} width={50}/>
      </button>
  )
}

