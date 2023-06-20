"use client"
import Image from "next/image"
import Location from 'public/assets/location.png'
import { useRouter } from "next/navigation"
import { getCurrentLocation } from "lib/geolocationCalc"
import { type GeocodeResponse } from 'types';

interface GeoBtnProps {
  onLocationReceived?: (lat: number, lng: number) => void;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

const GeoBtn: React.FC<GeoBtnProps> = ({ onLocationReceived }) => {
  const router = useRouter();
  
  const handleClick = async (): Promise<void> => {
    try {
      const { lat, lng }: Coordinates = await getCurrentLocation(onLocationReceived);
  
      const apiUrl = `/api/reverseGeo?lat=${lat}&lng=${lng}`;
      const response = await fetch(apiUrl);
      const data = await response.json() as GeocodeResponse;
  
      const city = data.results[0]?.address_components[2]?.long_name ?? '';
      const country = data.results[0]?.address_components[5]?.long_name ?? '';
      const encodedCity = encodeURIComponent(city);
      const encodedCountry = encodeURIComponent(country);
  
      const url = `/information?city=${encodedCity},${encodedCountry}&lat=${lat}&lng=${lng}`;
      router.push(url);
    } catch (error) {
      console.error('Error getting location', error);
    }
  };

  return (
    <button
      aria-label="geo location"
      className="transition-all hover:scale-110"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleClick}
    >
      <Image
        aria-hidden="true"
        src={Location}
        alt="geo location"
        quality={50}
        width={50}
        height={50}
      />
    </button>
  );
};

export default GeoBtn;