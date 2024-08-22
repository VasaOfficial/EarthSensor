'use client'
import Link from 'next/link'
import { Inconsolata } from 'next/font/google'
import './styles/error.css'

const inconsolata = Inconsolata({ subsets: ['latin'] })

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <>
      <div className="noise"></div>
      <div className="overlay"></div>
      <div className={`${inconsolata.className} terminal`}>
        <h1>
          Error <span className="errorcode">404</span>
        </h1>
        <p className="output">
          The page you are looking for might have been removed, had its name changed or is
          temporarily unavailable.
        </p>
        <p className="output">
          Please try <Link href="/">again</Link>
        </p>
        <p className="output">Good luck.</p>
      </div>
    </>
  )
}

export default Error
