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

export async function GET() {
  const apiKey = env.AQI_API;
  const apiUrl = `https://api.waqi.info/v2/map/bounds?latlng=-85,-180,85,180&networks=official&token=${apiKey}`

  const res = await fetch(apiUrl);

  const { data } = await res.json() as { data: DataItem[] };

  return NextResponse.json({ data });
}
