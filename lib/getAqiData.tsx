export default async function getAqiData() {
  const res = await fetch('https://earth-sensor.vercel.app/api/aqi')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
