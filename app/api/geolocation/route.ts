import { NextResponse } from 'next/server'
import { env } from 'app/env.mjs'

interface DataItem {
  lat: number
  lon: number
  uid: number
  aqi: string
  station: {
    name: string
    time: string
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const lat = url.searchParams.get('lat')
  const lng = url.searchParams.get('lng')
  const apiKey = env.AQI_API

  if (lat === null || lng === null) {
    return NextResponse.error()
  }

  const apiUrl = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${apiKey}`

  const res = await fetch(apiUrl)
  const data = (await res.json()) as DataItem

  return NextResponse.json(data)
}
