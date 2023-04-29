import "./globals.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Metadata } from 'next';

// favicon imports
import Favicon32 from 'public/favicon/favicon-32x32.png'
import Favicon16 from 'public/favicon/favicon-16x16.png'
import AppleTouch from 'public/favicon/apple-touch-icon.png'

export const metadata: Metadata = {
  title: {
    template: '%s | EarthSensor',
    default: 'EarthSensor',
  },
  description: 'Find the quality of the air of the city or country',
  creator: 'Vasilije Pleskonjic',
  keywords: ['AQI', 'Air Quality', 'Wather'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="eng">
      <body>
        {children}
      </body>
    </html>
  )
}


/**
 * 
        <link rel="apple-touch-icon" sizes="180x180" href={AppleTouch.src} />
        <link rel="icon" type="image/png" sizes="32x32" href={Favicon32.src} />
        <link rel="icon" type="image/png" sizes="16x16" href={Favicon16.src} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
 */