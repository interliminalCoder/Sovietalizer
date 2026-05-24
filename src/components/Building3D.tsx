'use client'

import { useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Floor from './Floor'
import SnowParticles from './SnowParticles'
import Street from './Street'

function Building({ onDoorClick, doorStates }: {
  onDoorClick: (floorIndex: number, doorIndex: number) => void
  doorStates: Record<string, boolean>
}) {
  const numFloors = 4
  const floors = []

  for (let i = 0; i < numFloors; i++) {
    const y = i * 1.5 + 0.75
    floors.push(
      <Floor
        key={i}
        index={i}
        position={[0, y, 0]}
        doorStates={doorStates}
        onDoorClick={onDoorClick}
      />
    )
  }

  return (
    <group>
      {floors}
    </group>
  )
}

export default function Building3D({ onDoorClick, doorStates }: {
  onDoorClick: (floorIndex: number, doorIndex: number) => void
  doorStates: Record<string, boolean>
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2.5, 6], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={['#0f1422'] as any} />

        <ambientLight intensity={0.6} color="#6a7a8a" />
        <directionalLight position={[5, 12, 8]} intensity={0.7} color="#aabbcc" />
        <directionalLight position={[-4, 8, -6]} intensity={0.3} color="#8899bb" />
        <hemisphereLight args={['#5a7a9a', '#1a1a2a', 0.4]} />

        <Building
          onDoorClick={onDoorClick}
          doorStates={doorStates}
        />

        <Street />

        <SnowParticles count={600} />

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={0.15}
          minDistance={3.5}
          maxDistance={10}
          rotateSpeed={0.4}
          zoomSpeed={0.6}
          target={[0, 2.5, 0]}
        />
      </Canvas>
    </div>
  )
}
