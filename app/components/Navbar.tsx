import Link from "next/link"
import Image from "next/image"
import Logo from 'public/assets/earthsensor.png'
import SearchBar from "./Search"

interface NavbarProps {
  className: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav className={`navbar fixed w-full top-0 z-50 bg-[#020617] ${className}`}>
      <div className="flex max-w-[70rem] justify-between items-center py-4 mx-auto my-0 px-[5vw]">
        <Link href="/">
          <Image
          priority={true}
          quality={40}
          src={Logo}
          alt="Logo"
          width={150}
          height={150}
          style={{ width: "auto", height: "auto" }}>
          </Image>
        </Link>
        <SearchBar />
      </div>
    </nav>
  )
}