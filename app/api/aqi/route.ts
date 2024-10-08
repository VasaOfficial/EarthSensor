import { NextResponse } from 'next/server'
import { env } from 'app/env.mjs'

type DataItem = {
  lat: number
  lon: number
  uid: number
  aqi: string
  station: {
    name: string
    time: string
  }
}

export async function GET() {
  const apiKey = env.AQI_API
  const apiUrl = `https://api.waqi.info/v2/map/bounds?latlng=-85,-180,85,180&networks=official&token=${apiKey}`

  const res = await fetch(apiUrl, { next: { revalidate: 7200 } })

  const { data } = (await res.json()) as { data: DataItem[] }

  return NextResponse.json({ data })
}
