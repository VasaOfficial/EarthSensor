import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1bm8yMjMyIiwiYSI6ImNsZ2duazFmODBkZnAzcm8wbzdycnk3bG4ifQ.k4eDylfV8LZBbNwnVuanqw';

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: [-96, 37.8],
        zoom: 3,
        pitch: 0,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        flyTo: {
          zoom: 10,
        },
      });

      map.addControl(geocoder);
    }
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;

