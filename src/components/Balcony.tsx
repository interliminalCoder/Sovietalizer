'use client'

export default function Balcony({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.35, 0.2]} castShadow>
        <boxGeometry args={[0.6, 0.04, 0.35]} />
        <meshStandardMaterial color="#5a6070" roughness={0.9} />
      </mesh>

      <mesh position={[0, -0.2, 0.4]} castShadow>
        <boxGeometry args={[0.56, 0.02, 0.02]} />
        <meshStandardMaterial color="#3a4050" roughness={0.6} metalness={0.4} />
      </mesh>

      <mesh position={[0, -0.28, 0.4]} castShadow>
        <boxGeometry args={[0.56, 0.02, 0.02]} />
        <meshStandardMaterial color="#3a4050" roughness={0.6} metalness={0.4} />
      </mesh>

      {[-0.24, 0, 0.24].map((x) => (
        <mesh key={x} position={[x, -0.27, 0.4]} castShadow>
          <boxGeometry args={[0.02, 0.16, 0.02]} />
          <meshStandardMaterial color="#3a4050" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
    </group>
  )
}
