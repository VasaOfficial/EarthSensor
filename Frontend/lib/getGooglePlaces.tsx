import { env } from "~/env.mjs"

export default async function getGooglePlaces() {
  const res = await fetch(`https://maps.googleapis.com/maps/api/js?key=${env.NEXT_PUBLIC_GOOGLE_MAP_API}&libraries=places&callback=initMap`)

  if(!res)
  return (
    <div>getGooglePlaces</div>
  )
}
