import "./globals.css"
import type { Metadata } from 'next';

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