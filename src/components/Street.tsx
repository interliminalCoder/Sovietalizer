'use client'

import LampPost from './LampPost'

export default function Street() {
  const lampPositions: [number, number, number][] = [
    [-3, 0, -2.5],
    [3, 0, -2.5],
    [-3, 0, 2.5],
    [3, 0, 2.5],
    [-2, 0, -4],
    [2, 0, -4],
    [0, 0, 4.5],
  ]

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#5a5a6a" roughness={0.95} metalness={0} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial
          color="#dde0e8"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.15}
        />
      </mesh>

      {lampPositions.map((pos, i) => (
        <LampPost key={i} position={pos} />
      ))}
    </group>
  )
}
