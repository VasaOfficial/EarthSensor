"use client"

import Image from "next/image"
import Location from 'public/assets/location.png'

interface GeoBtnProps {
  onLocationReceived?: (latitude: number, longitude: number) => void;
}

const GeoBtn: React.FC<GeoBtnProps> = ({ onLocationReceived }) => {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          if (onLocationReceived) {
            onLocationReceived(latitude, longitude);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
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
        width={50}
        height={50}
      />
    </button>
  );
};

export default GeoBtn;