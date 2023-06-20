import { z } from 'zod';

export type GeoData = {
  lat: number;
  lon: number;
  aqi: number;
  info: { name: string; aqi: number; time: Date };
  radius: number;
  station: { name: string; time: Date}
};

const ResultSchema = z.object({
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
  status: string,
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
        [key: string]: DailyForecast[];
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

export type PolluantsDefinition = {
  [key: string]: string;
  'PM2.5': string;
  PM10: string;
  O3: string;
  NO2: string;
  SO2: string;
  CO: string;
}

export type DailyForecast = {
  avg: number;
};

export type WeatherData = {
  current: CurrentWeather;
  daily: DailyWeather[];
}

type CurrentWeather = {
  temp: number;
  feels_like: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
  weather: WeatherCondition[];
}

type WeatherCondition = {
  id: number;
  description: string;
}
 
export type DailyWeather = {
    day: number;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export interface GeocodeResponse {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
  }[];
}