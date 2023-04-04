import Link from "next/link"
import Image from "next/image"
import Logo from 'public/assets/earthsensor.png'
import Search from "../search"

export default function Navbar() {
  return (
    <nav className="navbar bg-[#020617]">
      <div className="flex max-w-6xl px-15 justify-between items-center p-3 w-full mx-auto">
        <Link href="/" className="btn btn-ghost normal-case text-xl ">
          <Image src={Logo} alt="Logo" width="150" height="150"></Image>
        </Link>
        <Search />
      </div>
    </nav>
  )
}