import Image from 'next/image'
import Logo from 'public/assets/earthsensor.png'
import Website from 'public/assets/portfolio.png'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer relative w-full p-4 text-neutral-content bg-[#020617]">
      <div className="flex items-center justify-center">
        <Image className='pb-1' src={Logo} alt='Logo' width="150" height="150"></Image>
        <p className="mx-4 text-white">Copyright © 2023 - All right reserved by Vasilije Pleskonjic</p>
        <Link href="https://nextjs.org">
          <Image src={Website} alt='Portfolio Website' width="35" height="35"></Image>
        </Link>
      </div> 
    </footer>
  )
}
