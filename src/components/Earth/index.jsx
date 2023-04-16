import Map from 'react-map-gl';

export default function Map3d() {
  return (
    <Map
      initialViewState={{
        longitude: 20.568829,
        latitude: 11.612623,
        zoom: 1.61
      }}
      style={{width: 800, height: 500}}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
      mapboxAccessToken={process.env.mapbox_key}
      projection={'globe'}
      attributionControl={false}
      touchPitch={false}
    />
  )
}