'use client'

import { type TimeOfDay } from '@/lib/timeConfig'
import Balcony from './Balcony'
import Door from './Door'

interface FloorProps {
  index: number
  position: [number, number, number]
  doorStates: Record<string, boolean>
  onDoorClick: (floorIndex: number, doorIndex: number) => void
  time: TimeOfDay
}

const FLOOR_HEIGHT = 1.0
const FLOOR_WIDTH = 3.5
const FLOOR_DEPTH = 2.0

export default function Floor({ index, position, doorStates, onDoorClick, time }: FloorProps) {
  return (
    <group position={position}>
      <mesh position={[0, FLOOR_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[FLOOR_WIDTH, FLOOR_HEIGHT, FLOOR_DEPTH]} />
        <meshStandardMaterial color="#5a6070" roughness={0.85} metalness={0.05} />
      </mesh>

      <mesh position={[0, FLOOR_HEIGHT, 0]} castShadow receiveShadow>
        <boxGeometry args={[FLOOR_WIDTH + 0.08, 0.03, FLOOR_DEPTH + 0.08]} />
        <meshStandardMaterial color="#4a5060" roughness={0.85} />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[FLOOR_WIDTH + 0.06, 0.02, FLOOR_DEPTH + 0.06]} />
        <meshStandardMaterial color="#4a5060" roughness={0.85} />
      </mesh>

      {[0, 1, 2].map((col) => {
        const dx = (col - 1) * 1.1
        return (
          <group key={col}>
            <Balcony position={[dx, 0, FLOOR_DEPTH / 2]} />
            <Door
              position={[dx, 0.05, FLOOR_DEPTH / 2 + 0.02]}
              onClick={() => onDoorClick(index, col)}
              isOpen={!!doorStates[`${index}-${col}`]}
              index={col}
            />
          </group>
        )
      })}
    </group>
  )
}
