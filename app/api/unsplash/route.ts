import { NextResponse } from 'next/server';
import { env } from 'app/env.mjs';

type ImageData = {
  results: {
    urls: {
      regular: string;
    };
    links: {
      html: string;
    };
    user: {
      name: string;
    };
  }[];
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const apiKey = env.UNSPLASH_API;

  if (!query) {
    throw new Error('query parameter is missing');
  }
  
  const apiUrl = `https://api.unsplash.com/search/photos?&per_page=10&orientation=landscape&query=${encodeURIComponent(query)}&client_id=${apiKey}`;

  const res = await fetch(apiUrl);
  const data = await res.json() as ImageData;

  return NextResponse.json(data);
}
