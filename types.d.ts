import { z } from 'zod';

export type GeoData = {
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

export type AqiDataSchema = {
  data: {
    aqi: number;
    city: {
      name: string;
    };
    time: {
      iso: string;
    };
    iaqi: {
      [key: string]: {
        v: number;
      };
    };
    forecast: {
      daily: {
        o3: DailyForecast[];
        pm10: DailyForecast[];
        pm25: DailyForecast[];
      };
    };
  };
};

export type DailyForecast = {
  avg: number;
  day: string;
  max: number;
  min: number;
};
