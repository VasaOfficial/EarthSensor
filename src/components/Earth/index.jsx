import { useState, useEffect } from 'react';
import Map from 'react-map-gl';

import { env } from '~/env.mjs';

export default function Map3d() {
  const [viewState, setViewState] = useState({
    longitude: 20.568829,
    latitude: 11.612623,
    zoom: 1.61,
  });
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewState((prev) => ({
        ...prev,
        longitude: prev.longitude + 0.2, // Adjust the rotation speed here
      }));
    }, 50); // Adjust the interval here

    return () => clearInterval(interval);
  }, []);

  const handleMove = (event) => {
    setIsRotating(event.dragging);
    if (!event.dragging && !isRotating) {
      setViewState(event.viewState);
    }
  };

  return (
    <Map
      {...viewState}
      style={{ width: 800, height: 500 }}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_KEY}
      dragRotate={true}
      onLoad={() => setIsRotating(false)}
      onMove={handleMove}
      attributionControl={false}
      logoPosition={'bottom-right'}
      projection={'globe'}
      scrollZoom={false}
    />
  );
}
