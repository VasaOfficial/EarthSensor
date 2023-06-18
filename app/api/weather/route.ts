import { NextResponse } from 'next/server';
import { env } from 'app/env.mjs';
import { type WeatherData } from 'types';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');
  const apiKey = env.OPENWEATHER_API;

  if (lat === null || lng === null) {
    return NextResponse.error();
  }
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  const res = await fetch(apiUrl, { next: { revalidate: 10 } });
  const data = await res.json() as WeatherData;

  return NextResponse.json(data);
}
