import { NextResponse } from 'next/server'
import { env } from 'app/env.mjs'
import { type GeocodeResponse } from 'types'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const lat = url.searchParams.get('lat')
  const lng = url.searchParams.get('lng')
  const apiKey = env.GOOGLE_MAP_API

  if (lat === null || lng === null) {
    return NextResponse.error()
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

  const res = await fetch(apiUrl)
  const data = (await res.json()) as GeocodeResponse

  return NextResponse.json(data)
}
