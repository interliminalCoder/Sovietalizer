'use client'

import { type TimeOfDay, timeConfigs } from '@/lib/timeConfig'

interface LampPostProps {
  position: [number, number, number]
  time: TimeOfDay
}

export default function LampPost({ position, time }: LampPostProps) {
  const cfg = timeConfigs[time]
  const intensity = cfg.lampIntensity

  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.16]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.8} metalness={0.3} />
      </mesh>

      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 1]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0.25, 1.05, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
        <meshStandardMaterial color="#3a3a4a" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0.25, 1.05, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial
          color="#ffcc66"
          emissive="#ffcc66"
          emissiveIntensity={intensity * 1.5}
        />
      </mesh>

      {intensity > 0.1 && (
        <pointLight
          position={[0.25, 1.05, 0]}
          color="#ffcc66"
          intensity={intensity}
          distance={5}
          decay={2}
          castShadow
        />
      )}
    </group>
  )
}
