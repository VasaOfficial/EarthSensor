export default async function getAqiData() {
    const res = await fetch('http://localhost:3000/api/aqi', { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      return res.json();
}