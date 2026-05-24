'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Floor from './Floor'
import SnowParticles from './SnowParticles'
import Street from './Street'
import { type TimeOfDay, timeConfigs } from '@/lib/timeConfig'

function Building({ onDoorClick, doorStates, time }: {
  onDoorClick: (floorIndex: number, doorIndex: number) => void
  doorStates: Record<string, boolean>
  time: TimeOfDay
}) {
  const sections = []
  for (let i = 0; i < 4; i++) {
    sections.push(
      <Floor
        key={i}
        index={i}
        position={[0, i * 1.0, 0]}
        doorStates={doorStates}
        onDoorClick={onDoorClick}
        time={time}
      />
    )
  }

  return <group>{sections}</group>
}

function SceneLights({ time }: { time: TimeOfDay }) {
  const cfg = timeConfigs[time]

  return (
    <>
      <ambientLight intensity={cfg.ambient.intensity} color={cfg.ambient.color} />
      <directionalLight
        position={cfg.directional1.position}
        intensity={cfg.directional1.intensity}
        color={cfg.directional1.color}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight
        position={cfg.directional2.position}
        intensity={cfg.directional2.intensity}
        color={cfg.directional2.color}
      />
      <hemisphereLight
        args={[cfg.hemi.sky, cfg.hemi.ground, cfg.hemi.intensity] as any}
      />
    </>
  )
}

export default function Building3D({ onDoorClick, doorStates, time }: {
  onDoorClick: (floorIndex: number, doorIndex: number) => void
  doorStates: Record<string, boolean>
  time: TimeOfDay
}) {
  const cfg = timeConfigs[time]

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2.5, 6], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: cfg.exposure,
        }}
        shadows
      >
        <color attach="background" args={[cfg.background] as any} />

        <SceneLights time={time} />

        <Building
          onDoorClick={onDoorClick}
          doorStates={doorStates}
          time={time}
        />

        <Street time={time} />

        <SnowParticles count={500} />

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={0.15}
          minDistance={3.5}
          maxDistance={10}
          rotateSpeed={0.4}
          zoomSpeed={0.6}
          target={[0, 2, 0]}
        />
      </Canvas>
    </div>
  )
}
