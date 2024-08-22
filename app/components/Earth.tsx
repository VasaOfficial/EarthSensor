import { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, type Group } from 'three'
import * as THREE from 'three'
import { type GeoData } from 'types'
import Prism from 'utils/Prism'

import globeVertexShader from 'shaders/globe/vertex.glsl'
import globeFragmentShader from '/shaders/globe/fragment.glsl'
import atmosphereVertexShader from '/shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '/shaders/atmosphere/fragment.glsl'

interface GlobeProps {
  radius: number
}

interface AtmosphereProps {
  radius: number
}

const Globe: React.FC<GlobeProps> = ({ radius }) => {
  const globeTexture = useLoader(TextureLoader, '/textures/globe2.jpg')
  return (
    <mesh rotation={[0, -Math.PI / 2, 0]}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            vertexShader: globeVertexShader,
            fragmentShader: globeFragmentShader,
            uniforms: {
              globeTexture: { value: globeTexture },
            },
          },
        ]}
      />
    </mesh>
  )
}

const Atmosphere: React.FC<AtmosphereProps> = ({ radius }) => {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            side: THREE.BackSide,
            transparent: true,
          },
        ]}
      />
    </mesh>
  )
}

const Earth: React.FC<{ data: GeoData[] }> = ({ data }) => {
  const earthRef = useRef<Group | undefined>(undefined)
  const [radius, setRadius] = useState(
    window.innerWidth < 640
      ? window.innerWidth / 500
      : window.innerWidth < 768
        ? window.innerWidth / 600
        : Math.min(window.innerWidth / 1300, 1),
  )

  // Resize for responsive
  const onWindowResize = () => {
    const width = window.innerWidth
    setRadius(width < 640 ? width / 500 : width < 768 ? width / 600 : Math.min(width / 1300, 1))
  }

  // Listener resize events
  useEffect(() => {
    addEventListener('resize', onWindowResize, false)

    return () => {
      removeEventListener('resize', onWindowResize, false)
    }
  }, [])

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0001
    }
  })

  return (
    <group
      ref={earthRef as React.MutableRefObject<Group>}
      onPointerOver={(e) => {
        e.stopPropagation()
      }}
    >
      <Globe radius={radius} />
      <Atmosphere radius={radius} />
      {
        // Map through the data array to create prism
        data &&
          data.map(
            (el, i) =>
              el.aqi > 50 && (
                <Prism
                  radius={radius}
                  key={`${el.station.name}${i}`}
                  lat={el.lat}
                  long={el.lon}
                  aqi={el.aqi}
                  info={{
                    name: el.station.name,
                    aqi: el.aqi,
                    time: el.station.time,
                  }}
                />
              ),
          )
      }
    </group>
  )
}

export default Earth
