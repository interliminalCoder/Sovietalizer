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

export default function Door({ position, onClick, isOpen, index }: DoorProps) {
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
      <mesh position={[0.23, 0, 0]}>
        <boxGeometry args={[0.46, 0.66, 0.04]} />
        <meshStandardMaterial
          color={isOpen ? '#4a5a7a' : '#2a3048'}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0.23, -0.12, 0.02]}>
        <planeGeometry args={[0.36, 0.24]} />
        <meshStandardMaterial
          color="#3a4050"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0.23, 0.18, 0.02]}>
        <planeGeometry args={[0.36, 0.18]} />
        <meshStandardMaterial
          color="#3a4050"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0.1, 0.02, 0.03]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#7a9aba" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0.23, 0.22, 0.025]}>
        <cylinderGeometry args={[0.006, 0.008, 0.015, 6]} />
        <meshStandardMaterial color="#4a5a6a" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}
