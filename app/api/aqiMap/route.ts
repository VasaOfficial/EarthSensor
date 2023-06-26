import { NextResponse } from 'next/server';
import { env } from 'app/env.mjs';

type DataItem = {
  lat: number;
  lon: number;
  uid: number;
  aqi: string;
  station: {
    name: string;
    time: string;
  };
}

export async function GET(request: Request, { params }: { params: {latlng: string}}) {
  const { latlng } = params;
  const apiKey = env.AQI_API;

  let apiUrl: string;
  if (latlng) {
    apiUrl = `https://api.waqi.info/v2/map/bounds?latlng=${latlng.toString()}&networks=official&token=${apiKey}`;
  } else {
    // Handle the case when latlng is undefined
    throw new Error("Missing latlng parameter");
  }

  const res = await fetch(apiUrl);

  const { data } = await res.json() as { data: DataItem[] };

  return NextResponse.json({ data });
}