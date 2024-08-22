'use client'
import Image from 'next/image'

interface Row {
  key: string
  rank: number
  country: string
  aqi: number
  flag: string
}

const Top10Chart = () => {
  const columns = [
    {
      key: 'rank',
      label: 'Rank',
    },
    {
      key: 'country',
      label: 'Country',
    },
    {
      key: 'aqi',
      label: 'AQI',
    },
  ]
  const rows: Row[] = [
    {
      key: '1',
      rank: 1,
      country: 'Chad',
      aqi: 89.7,
      flag: '/assets/flags/chad.jpg',
    },
    {
      key: '2',
      rank: 2,
      country: 'Iraq',
      aqi: 80.1,
      flag: '/assets/flags/iraq.jpg',
    },
    {
      key: '3',
      rank: 3,
      country: 'Pakistan',
      aqi: 70.9,
      flag: '/assets/flags/pakistan.jpg',
    },
    {
      key: '4',
      rank: 4,
      country: 'Bahrain',
      aqi: 66.6,
      flag: '/assets/flags/bahrain.jpg',
    },
    {
      key: '5',
      rank: 5,
      country: 'Bangladesh',
      aqi: 65.8,
      flag: '/assets/flags/bangladesh.jpg',
    },
    {
      key: '6',
      rank: 6,
      country: 'Burkina Faso',
      aqi: 63,
      flag: '/assets/flags/burkina-faso.jpg',
    },
    {
      key: '7',
      rank: 7,
      country: 'Kuwait',
      aqi: 55.8,
      flag: '/assets/flags/kuwait.jpg',
    },
    {
      key: '8',
      rank: 8,
      country: 'India',
      aqi: 53.3,
      flag: '/assets/flags/india.jpg',
    },
    {
      key: '9',
      rank: 9,
      country: 'Egypt',
      aqi: 46.5,
      flag: '/assets/flags/egypt.jpg',
    },
    {
      key: '10',
      rank: 10,
      country: 'Tajikistan',
      aqi: 46,
      flag: '/assets/flags/tajikistan.jpg',
    },
  ]
  return (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="border-4 border-gray-300 py-2 px-4 text-left text-gray-700 font-bold bg-gray-100"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item: Row) => (
          <tr key={item.key}>
            <td className="border-2 border-gray-300 py-2 px-4 font-bold">{item.rank}</td>
            <td className="border-2 border-gray-300 py-2 px-4 font-bold">
              <div className="flex items-center">
                <Image
                  src={item.flag}
                  alt={item.country}
                  width={34}
                  height={22}
                  className="mr-2"
                  style={{ width: 'auto', height: 'auto' }}
                />
                {item.country}
              </div>
            </td>
            <td className="border-2 border-gray-300 py-2 px-4 font-bold text-red-600">
              {item.aqi}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Top10Chart
