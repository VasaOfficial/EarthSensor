function Navbar() {
  return (
    <nav className="navbar bg-black bg-opacity-50 backdrop-filter backdrop-saturate-180 backdrop-blur-10 box-shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">EarthScanner</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <img src="~/assets/github-mark-white.svg" alt="github-icon" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar;