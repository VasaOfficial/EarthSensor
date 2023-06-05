import { NextResponse } from 'next/server';         
import { env } from 'app/env.mjs';

interface DataItem {
    lat: number;
    lon: number;
    uid: number;
    aqi: string;
    station: {
      name: string;
      time: string;
    };
  }
export async function GET(request: Request) {
  const url = new URL(request.url);
  const city = url.searchParams.get('city') as string;
  const apiKey = env.GOOGLE_MAP_API;

  if (!city) {
    return NextResponse.error();
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;

  const res = await fetch(apiUrl);
  const data = await res.json() as DataItem;

  return NextResponse.json(data);
}