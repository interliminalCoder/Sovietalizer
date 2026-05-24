'use client'

import * as THREE from 'three'

interface WindowProps {
  position: [number, number, number]
  hasLight?: boolean
}

export default function Window({ position, hasLight }: WindowProps) {
  return (
    <group position={position}>
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[0.48, 0.6, 0.12]} />
        <meshStandardMaterial color="#14142a" roughness={0.9} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.52, 0.64, 0.03]} />
        <meshStandardMaterial color="#5a6070" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.42, 0.54]} />
        <meshStandardMaterial
          color={hasLight ? '#ffdd88' : '#2a3a4a'}
          emissive={hasLight ? '#ffdd88' : undefined}
          emissiveIntensity={hasLight ? 0.6 : 0}
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}
