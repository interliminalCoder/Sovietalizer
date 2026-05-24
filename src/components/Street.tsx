'use client'

import { type TimeOfDay, timeConfigs } from '@/lib/timeConfig'
import LampPost from './LampPost'

export default function Street({ time }: { time: TimeOfDay }) {
  const cfg = timeConfigs[time]

  const lampPositions: [number, number, number][] = [
    [-2.8, 0, -2.8],
    [2.8, 0, -2.8],
    [-2.8, 0, 2.8],
    [2.8, 0, 2.8],
    [-1.5, 0, -4],
    [1.5, 0, -4],
    [0, 0, 4.5],
  ]

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color={cfg.streetColor} roughness={0.95} metalness={0} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#dde0e8"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.12}
        />
      </mesh>

      {lampPositions.map((pos, i) => (
        <LampPost key={i} position={pos} time={time} />
      ))}
    </group>
  )
}
