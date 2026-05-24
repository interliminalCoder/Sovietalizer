'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SnowParticles({ count = 600 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null) as React.MutableRefObject<THREE.Points | null>
  const velocities = useRef<Float32Array | null>(null)
  const opacities = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const opa = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 13
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = -(0.006 + Math.random() * 0.012)
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
      opa[i] = 0.3 + Math.random() * 0.4
    }
    velocities.current = vel
    opacities.current = opa
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  const sizeAttenuation = true

  useFrame(() => {
    if (!meshRef.current || !velocities.current || !opacities.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    const vel = velocities.current
    for (let i = 0; i < count; i++) {
      pos[i * 3] += vel[i * 3]
      pos[i * 3 + 1] += vel[i * 3 + 1]
      pos[i * 3 + 2] += vel[i * 3 + 2]
      if (pos[i * 3 + 1] < -0.5) {
        const fade = (pos[i * 3 + 1] + 2) / 1.5
        const clampedFade = Math.max(0, Math.min(1, fade))
        const material = meshRef.current.material as THREE.PointsMaterial
        if (!material.opacity) material.opacity = 1
      }
      if (pos[i * 3 + 1] < -2) {
        pos[i * 3 + 1] = 11 + Math.random() * 2
        pos[i * 3] = (Math.random() - 0.5) * 20
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20
        opacities.current[i] = 0.3 + Math.random() * 0.4
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#c8d0e0"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
