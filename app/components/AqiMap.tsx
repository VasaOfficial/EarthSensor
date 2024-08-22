import { useEffect, useState } from 'react'
import Map from 'react-map-gl'
import MapMarker from './MapMarker'
import gsap from 'gsap'
import { type Coordinates } from 'types'
import { env } from 'app/env.mjs'

interface AqiMapProps {
  coordinates: Coordinates | null
}

type DataItem = {
  lat: number
  lon: number
  uid: number
  aqi: string
  station: {
    name: string
    time: string
  }
}

type AqiData = {
  data: DataItem[]
}

type CoordBounds = {
  lat: {
    max: number
    min: number
  }
  lon: {
    max: number
    min: number
  }
}

export default function AqiMap({ coordinates }: AqiMapProps) {
  const [data, setData] = useState<AqiData>()
  const [coordBounds, setCoordBounds] = useState<CoordBounds>()

  const closeTooltip = () => {
    gsap.set('#tooltip', {
      display: 'none',
    })
  }

  // tooltip functions
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const tooltip = document.querySelector('#tooltip') as HTMLElement
      const { clientX, clientY } = event

      gsap.set('#tooltip', {
        x: clientX - tooltip.offsetWidth / 2,
        y: clientY - tooltip.offsetHeight - 15,
      })
    }
    addEventListener('mousemove', onMouseMove)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const fetchAqiData = async () => {
    if (coordinates) {
      const bounds = {
        lat: { max: coordinates.lat + 2, min: coordinates.lat - 2 },
        lon: { max: coordinates.lon + 4, min: coordinates.lon - 4 },
      }
      setCoordBounds(bounds)

      const latlng = `${bounds.lat.min},${bounds.lon.max},${bounds.lat.max},${bounds.lon.min}`

      try {
        const res = await fetch(`https://earth-sensor.vercel.app/api/aqi?latlng=${latlng}`)
        if (res.ok) {
          const data = (await res.json()) as AqiData
          setData(data)
        } else {
          throw new Error('Failed to fetch aqi')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  // event listener first load
  useEffect(() => {
    const fetchData = async () => {
      await fetchAqiData()
    }

    fetchData().catch((error) => {
      console.error('Failed to fetch data:', error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates])

  return (
    <div className="w-full h-96 md:h-[30rem] rounded-lg overflow-hidden mt-6 bg-[#353433] p-1">
      {coordBounds && coordinates && (
        <Map
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            zoom: 1,
          }}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          maxZoom={14}
          minZoom={6.5}
          maxBounds={[
            [coordBounds.lon.min - 1, coordBounds.lat.min - 0.5],
            [coordBounds.lon.max + 1, coordBounds.lat.max + 0.5],
          ]}
          boxZoom={true}
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_KEY}
          onDragStart={closeTooltip}
          mapStyle="mapbox://styles/mapbox/dark-v10"
        >
          {data &&
            data.data.map((item: DataItem) => {
              if (item.aqi === '-' || item.aqi === undefined) return null
              return <MapMarker data={item} key={item.uid} />
            })}
        </Map>
      )}
    </div>
  )
}
