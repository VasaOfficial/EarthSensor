import { Inconsolata } from 'next/font/google'
import './styles/not-found.css'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="noise"></div>
        <div className="overlay"></div>
        <div className={`${inconsolata.className} text-center`}>
          <h2>Not Found</h2>
          <p>Could not find the requested resource</p>
        </div>
      </div>
    </>
  )
}
