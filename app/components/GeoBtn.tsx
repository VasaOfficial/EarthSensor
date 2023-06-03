"use client"

import Image from "next/image"
import Location from 'public/assets/location.png'
import { useRouter } from "next/navigation"

interface GeoBtnProps {
  onLocationReceived?: (latitude: number, longitude: number) => void;
}

const GeoBtn: React.FC<GeoBtnProps> = ({ onLocationReceived }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          if (onLocationReceived) {
            onLocationReceived(latitude, longitude);
          }

          router.push(`/information?lat=${latitude}&lng=${longitude}`);
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <button
      aria-label="geo location"
      className="transition-all hover:scale-110"
      onClick={handleClick}
    >
      <Image
        aria-hidden="true"
        src={Location}
        alt="geo location"
        quality={30}
        width={50}
        height={50}
      />
    </button>
  );
};

export default GeoBtn;