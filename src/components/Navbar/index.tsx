import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar  bg-black bg-opacity-50 backdrop-filter backdrop-saturate-180 backdrop-blur-10 box-shadow-md">
      <div className="flex-1">
        <Link href="http://localhost:3000" className="btn btn-ghost normal-case text-xl">EarthScanner</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        <div className="dropdown dropdown-end">
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
        </ul>
      </div>
      </div>
    </nav>
  )
}