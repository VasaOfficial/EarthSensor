import { z } from 'zod';

export type AqiData = {
  lat: number;
  lon: number;
  aqi: number;
  info: { name: string; aqi: number; time: Date };
  radius: number;
  station: { name: string; time: Date}
};

export const ResultSchema = z.object({
  urls: z.object({
    regular: z.string(),
  }),
  links: z.object({
    html: z.string(),
  }),
  user: z.object({
    name: z.string(),
  }),
});

export const APIResponseSchema = z.object({
  results: z.array(ResultSchema),
});