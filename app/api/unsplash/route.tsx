import { NextResponse } from 'next/server';
import { env } from 'app/env.mjs';
import { z } from "zod";

export const ImageData = z.object({
  results: z.array(
    z.object({
      urls: z.object({
        regular: z.string(),
      }),
      links: z.object({
        html: z.string(),
      }),
      user: z.object({
        name: z.string(),
      }),
    })
  ),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const apiKey = env.UNSPLASH_API;

  if (!query) {
    throw new Error('query parameter is missing');
  }
  
  const apiUrl = `https://api.unsplash.com/search/photos?&per_page=10&orientation=landscape&query=${encodeURIComponent(query)}&client_id=${apiKey}`;

  const res = await fetch(apiUrl);
  const data: unknown = await res.json();

  const validatedData = ImageData.parse(data);

  return NextResponse.json(validatedData);
}
