import Head from "next/head"
import Footer from "app/components/Footer"
import Navbar from "app/components/Navbar"
import UpBtn from "app/components/ScrollBtn"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Information Page'
}

export default function Information() {
  return (
    <>
    <Head>
      <title>EarthSensor | Search</title>
    </Head>
    <main>
      <Navbar />
    </main>
    <footer>
      <Footer />
    </footer>
      <UpBtn />
    </>
  )
}
