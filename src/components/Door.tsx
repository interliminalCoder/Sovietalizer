'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DoorProps {
  position: [number, number, number]
  onClick: () => void
  isOpen: boolean
  index: number
}

export default function Door({ position, onClick, isOpen }: DoorProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [targetRotation, setTargetRotation] = useState(0)
  const currentRotation = useRef(0)

  useFrame(() => {
    if (!groupRef.current) return
    currentRotation.current += (targetRotation - currentRotation.current) * 0.08
    groupRef.current.rotation.y = currentRotation.current
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setTargetRotation(isOpen ? 0 : -Math.PI / 2.5)
    onClick()
  }

  const doorColor = isOpen ? '#3a4a6a' : '#1a2030'
  const handleColor = '#6a8aaa'

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      <mesh position={[0.25, 0, 0]}>
        <boxGeometry args={[0.5, 0.75, 0.04]} />
        <meshStandardMaterial
          color={doorColor}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.15, 0, 0.03]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color={handleColor} metalness={0.6} roughness={0.3} />
      </mesh>
      {isOpen && (
        <mesh position={[0.25, 0, 0]} renderOrder={1}>
          <boxGeometry args={[0.52, 0.77, 0.01]} />
          <meshBasicMaterial
            color="#2a3a5a"
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}
