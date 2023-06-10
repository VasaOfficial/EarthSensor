import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GizmoHelper } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { type GeoData } from 'types'
import Earth from './Earth'

gsap.registerPlugin(ScrollTrigger)

const Scene: React.FC<{ data: GeoData[] }> = ({ data }) => {
  const [frameLoop, setFrameLoop] = useState<'always' | 'demand'>('always')

  // Listener for mouse movement
  const onMouseMove = (event: MouseEvent) => {
    const tooltip = document.querySelector('#tooltip') as HTMLElement
    const { clientX, clientY } = event

    if (tooltip) {
      gsap.set(tooltip, {
        x: clientX - tooltip.offsetWidth - 15,
        y: clientY - tooltip.offsetHeight / 2,
      })
    }
  }

  // disables globe animation when past the first section
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#canvas-container',
      start: 'bottom top+=20%',
      end: 'bottom top+=20%',
      onEnter: () => {
        setFrameLoop('demand')
      },

      onEnterBack: () => {
        setFrameLoop('always')
      },
    })

    gsap.to('#canvas-container', {
      duration: 3,
      opacity: '1',
      ease: 'power3.out',
    })

    addEventListener('mousemove', onMouseMove)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div
      className='h-full cursor-pointer origin-center opacity-0'
      id='canvas-container'>
      <Canvas
        frameloop={frameLoop}
        orthographic
        camera={{
          zoom: 250,
          position: [0, 2, 5],
        }}
      >
        <GizmoHelper alignment='bottom-right' />
        <OrbitControls
          dampingFactor={0.1}
          enablePan={false}
          rotateSpeed={0.5}
          enableZoom={false}
        />
        <Suspense fallback={null}>
          <Earth data={data} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene