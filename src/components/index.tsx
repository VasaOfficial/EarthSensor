import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar bg-black bg-opacity-50 backdrop-filter backdrop-saturate-180 backdrop-blur-10 box-shadow-md">
      <div className="flex-1">
        <Link href="http://localhost:3000" className="btn btn-ghost normal-case text-xl">EarthScanner</Link>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
        </button>
      </div>
    </nav>
  )
}
