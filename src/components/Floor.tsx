'use client'

import Door from './Door'

interface FloorProps {
  index: number
  position: [number, number, number]
  doorStates: Record<string, boolean>
  onDoorClick: (floorIndex: number, doorIndex: number) => void
}

const DOOR_COUNT = 3

export default function Floor({ index, position, doorStates, onDoorClick }: FloorProps) {
  const floorWidth = 2.8
  const floorHeight = 0.7
  const floorDepth = 1.8

  const doorSpacing = floorWidth / (DOOR_COUNT + 1)

  return (
    <group position={position}>
      <mesh userData={{ type: 'floor', floorIndex: index }}>
        <boxGeometry args={[floorWidth, floorHeight, floorDepth]} />
        <meshStandardMaterial
          color="#3a4050"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, -floorHeight / 2 - 0.03, 0]}>
        <boxGeometry args={[floorWidth + 0.1, 0.06, floorDepth + 0.1]} />
        <meshStandardMaterial color="#2a3040" roughness={0.95} metalness={0.05} />
      </mesh>

      <mesh position={[0, floorHeight / 2 + 0.03, 0]}>
        <boxGeometry args={[floorWidth + 0.05, 0.04, floorDepth + 0.05]} />
        <meshStandardMaterial color="#4a5060" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh position={[0, 0, floorDepth / 2 + 0.01]}>
        <boxGeometry args={[floorWidth - 0.3, floorHeight - 0.15, 0.02]} />
        <meshStandardMaterial color="#2a3040" roughness={0.9} />
      </mesh>

      {Array.from({ length: DOOR_COUNT }).map((_, i) => {
        const dx = (i + 1) * doorSpacing - floorWidth / 2
        const doorKey = `${index}-${i}`
        return (
          <Door
            key={doorKey}
            position={[dx, 0, floorDepth / 2 + 0.02]}
            onClick={() => onDoorClick(index, i)}
            isOpen={!!doorStates[doorKey]}
            index={i}
          />
        )
      })}
    </group>
  )
}
