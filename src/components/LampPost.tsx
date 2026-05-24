'use client'

import * as THREE from 'three'

interface LampPostProps {
  position: [number, number, number]
  lightColor?: string
}

export default function LampPost({ position, lightColor = '#ffbb66' }: LampPostProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.16]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.8} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0.25, 1.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0.25, 1.05, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={0.8} />
      </mesh>

      <pointLight
        position={[0.25, 1.05, 0]}
        color={lightColor}
        intensity={0.6}
        distance={4}
        decay={2}
      />
    </group>
  )
}
