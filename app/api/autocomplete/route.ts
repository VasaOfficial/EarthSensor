import { NextResponse } from 'next/server';         
import { env } from 'app/env.mjs';
import { z } from 'zod';

const PredictionSchema = z.object({
  description: z.string(),
});

const ApiResponseSchema = z.object({
  predictions: z.array(PredictionSchema),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  const apiKey = env.GOOGLE_MAP_API;

  if (!query) {
    throw new Error('query parameter is missing');
  }
  
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=(cities)&key=${apiKey}`;

  const response = await fetch(apiUrl);
  
  const responseData: unknown = await response.json();

  // Validate the response data against the schema
  const data = ApiResponseSchema.parse(responseData as Record<string, unknown>);

  // Extract descriptions from the response data
  const descriptions = data.predictions.map(prediction => prediction.description);

  return NextResponse.json({ descriptions });
}