import Image from 'next/image'
import Github from 'public/assets/github-mark-white.png'
import Logo from 'public/assets/earthsensor.png'
import Gmail from 'public/assets/gmail.png'
import Website from 'public/assets/portfolio.png'

export default function Footer() {
  return (
    <footer className="footer items-center p-4 text-neutral-content bg-[#020617]">
      <div className="flex items-center">
        <Image className='pb-1' src={Logo} alt='Logo' width="150" height="150"></Image>
        <p>Copyright © 2023 - All right reserved by Vasilije Pleskonjic</p>
      </div> 
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end pr-1">
        <a><Image src={Github} alt='GitHub' width="35" height="35"></Image></a> 
        <a><Image src={Gmail} alt='Gmail' width="35" height="35"></Image></a>
        <a><Image src={Website} alt='Portfolio Website' width="35" height="35"></Image></a>
      </div>
    </footer>
  )
}
