'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SnowParticles({ count = 600 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null) as React.MutableRefObject<THREE.Points | null>
  const velocities = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = -(0.008 + Math.random() * 0.015)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }
    velocities.current = vel
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  useFrame(() => {
    if (!meshRef.current || !velocities.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    const vel = velocities.current
    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3]
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3 + 2] += vel[i * 3 + 2]
      if (pos[i * 3 + 1] < -2) {
        pos[i * 3 + 1] = 12 + Math.random() * 3
        pos[i * 3] = (Math.random() - 0.5) * 20
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#aabbdd"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
