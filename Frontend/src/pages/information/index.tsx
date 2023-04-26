import Head from "next/head"
import Footer from "~/components/Footer"
import Navbar from "~/components/Navbar"
import UpBtn from "~/components/ScrollBtn"

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
