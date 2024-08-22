import { useLoader } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { format } from 'date-fns'
import { TextureLoader, type Mesh, type BufferGeometry, type Material } from 'three'
import * as THREE from 'three';

// Define the type for the `Prism` component props
type PrismProps = {
  lat: number
  long: number
  aqi: number
  info: Info
  radius: number
}

type Info = {
  name: string
  aqi: number
  time: Date
}

type CustomMesh = Mesh<BufferGeometry, Material | Material[]> & {
  aqi: number
  time: Date
}

// Prisms color palette
const colors = {
  hazardous: '#E763F9',
  veryUnhealthy: '#B982E1',
  unhealthy: '#B982E1',
  high: '#8BA1CA',
  moderate: '#5CC1B2',
  good: '#00FF83',
}

export default function Prism({ lat, long, aqi, info, radius }: PrismProps): JSX.Element {
  const prismRef = useRef<CustomMesh>(null)
  const matcapTexture = useLoader(TextureLoader, '/textures/prism-matcap2.jpg')

  // default properties
  const [properties, setProperties] = useState({
    height: 0,
    width: 0,
    color: colors.good,
    x: Math.cos((lat / 180) * Math.PI) * Math.sin((long / 180) * Math.PI),
    y: Math.sin((lat / 180) * Math.PI),
    z: Math.cos((lat / 180) * Math.PI) * Math.cos((long / 180) * Math.PI),
  })

  // Prism animation
  const animatePrism = (prism: THREE.Mesh, aqi: number) => {
    gsap.from(prism.scale, {
      duration: 2,
      z: 0,
      ease: 'power2',
      delay: 1,
      onComplete: () => {
        if (aqi < 201) return
        gsap.to(prism.scale, {
          duration: 2,
          z: 1.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: Math.random(),
        })
      },
    })
  }

  // Parameters of prisms
  const setParameters = () => {
    if (Number.isNaN(aqi) || aqi === undefined) return

    // sets width height and color of prism based on aqi
    setProperties((prevState) => ({
      ...prevState,
      height: Math.min(aqi / 1500, 0.13 + Math.random() * 0.1),
      // height: aqi / 3000,

      width:
        aqi >= 301
          ? 0.019
          : aqi >= 201
            ? 0.017
            : aqi >= 151
              ? 0.015
              : aqi >= 101
                ? 0.013
                : aqi >= 51
                  ? 0.012
                  : 0.01,

      color:
        aqi >= 301
          ? colors.hazardous
          : aqi >= 201
            ? colors.veryUnhealthy
            : aqi >= 151
              ? colors.unhealthy
              : aqi >= 101
                ? colors.high
                : aqi >= 51
                  ? colors.moderate
                  : colors.good,
    }))
    if (prismRef.current) {
      prismRef.current.lookAt(0, 0, 0)
      prismRef.current.name = info.name
      prismRef.current.aqi = info.aqi
      prismRef.current.time = info.time
    }

    // Start prism animation
    if (prismRef.current) animatePrism(prismRef.current, aqi)
  }

  // Displays tooltip
  const onPointerEnter = () => {
    const { name, aqi, time } = info
    const tooltipName = document.querySelector('#tooltip-name')
    const tooltipAQI = document.querySelector('#tooltip-aqi')
    const tooltipTime = document.querySelector('#tooltip-time')
    const tooltipElement = document.querySelector('#tooltip') as HTMLElement

    if (tooltipName && tooltipAQI && tooltipTime && tooltipElement) {
      tooltipName.innerHTML = `Station: ${name}`
      tooltipAQI.innerHTML = `${aqi} AQI (${
        aqi >= 301
          ? 'Hazardous'
          : aqi >= 201
            ? 'Very unhealthy'
            : aqi >= 151
              ? 'Unhealthy'
              : aqi >= 101
                ? 'High'
                : aqi >= 51
                  ? 'Moderate'
                  : 'Good'
      }) `
      tooltipTime.innerHTML = `updated at ${format(new Date(time), 'hh:mm a')}`

      const tooltipColor =
        aqi >= 301
          ? colors.hazardous
          : aqi >= 201
            ? colors.veryUnhealthy
            : aqi >= 151
              ? colors.unhealthy
              : aqi >= 101
                ? colors.high
                : aqi >= 51
                  ? colors.moderate
                  : colors.good

      tooltipElement.style.backgroundColor = tooltipColor

      gsap.set('#tooltip', {
        display: 'flex',
      })
    }
  }

  // Hides tooltip
  const onPointerLeave = () => {
    gsap.set('#tooltip', {
      display: 'none',
    })
  }

  useEffect(setParameters, [])

  return (
    <mesh
      position={[radius * properties.x, radius * properties.y, radius * properties.z]}
      ref={prismRef}
      onPointerOver={onPointerEnter}
      onPointerOut={onPointerLeave}
    >
      <boxGeometry
        args={[radius * properties.width, radius * properties.width, radius * properties.height]}
      />
      <meshMatcapMaterial matcap={matcapTexture} color={properties.color} />
    </mesh>
  )
}
