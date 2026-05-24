'use client'

import { useState, useRef, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Floor from './Floor'
import SnowParticles from './SnowParticles'

interface FloorHandle {
  floorIndex: number
  mesh: THREE.Mesh
}

function Building({ onFloorClick, onDoorClick, doorStates }: {
  onFloorClick: (floorIndex: number) => void
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

  const floorMeshes: FloorHandle[] = []

  return (
    <group
      onClick={(e) => {
        const obj = e.object
        if (obj.userData?.type === 'floor') {
          onFloorClick(obj.userData.floorIndex)
        }
      }}
    >
      {floors}
    </group>
  )
}

function CameraController({ selectedFloor }: { selectedFloor: number | null }) {
  const targetY = useRef(3)
  const currentY = useRef(3)

  useFrame(() => {
    currentY.current += (targetY.current - currentY.current) * 0.05
  })

  return null
}

export default function Building3D({ onDoorClick, doorStates }: {
  onDoorClick: (floorIndex: number, doorIndex: number) => void
  doorStates: Record<string, boolean>
}) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)

  const handleFloorClick = useCallback((floorIndex: number) => {
    setSelectedFloor(floorIndex)
  }, [])

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 50 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#080c18'] as any} />
        <fog attach="fog" args={['#080c18', 8, 18]} />

        <ambientLight intensity={0.25} color="#404066" />
        <directionalLight position={[8, 12, 6]} intensity={0.4} color="#7a9abb" />
        <directionalLight position={[-6, 8, -4]} intensity={0.15} color="#4a6a8a" />
        <pointLight position={[0, -2, 0]} intensity={0.08} color="#2a3a5a" />

        <Building
          onFloorClick={handleFloorClick}
          onDoorClick={onDoorClick}
          doorStates={doorStates}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0a0e1a" roughness={1} />
        </mesh>

        <SnowParticles count={600} />

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={0.1}
          minDistance={3}
          maxDistance={10}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
