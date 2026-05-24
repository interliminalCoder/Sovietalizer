'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import RecommendationModal from '@/components/RecommendationModal'

const Building3D = dynamic(() => import('@/components/Building3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#080c18' }}>
      <div className="text-center">
        <div
          className="w-8 h-8 rounded-full animate-spin mx-auto mb-4"
          style={{ border: '2px solid #1a2240', borderTopColor: '#5a7a9a' }}
        />
        <p className="text-sm" style={{ color: '#5a7a9a' }}>Loading Sovietalizer...</p>
      </div>
    </div>
  ),
})

import { getRecommendationsForFloor } from '@/lib/recommendations'

export default function Home() {
  const [doorStates, setDoorStates] = useState<Record<string, boolean>>({})
  const [activeRecommendation, setActiveRecommendation] = useState<string | null>(null)

  const handleDoorClick = useCallback((floorIndex: number, doorIndex: number) => {
    const doorKey = `${floorIndex}-${doorIndex}`
    setDoorStates((prev) => {
      const newState = { ...prev }
      if (newState[doorKey]) {
        delete newState[doorKey]
        setActiveRecommendation(null)
        return newState
      }
      newState[doorKey] = true
      return newState
    })

    const recs = getRecommendationsForFloor(floorIndex, 3)
    if (recs[doorIndex]) {
      setActiveRecommendation(recs[doorIndex].id)
    }
  }, [])

  const handleCloseModal = useCallback(() => {
    setDoorStates({})
    setActiveRecommendation(null)
  }, [])

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: '#080c18' }}>
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center pointer-events-none">
        <h1
          className="text-lg font-bold tracking-[0.3em] uppercase"
          style={{ color: '#5a7a9a', textShadow: '0 0 20px rgba(90, 122, 154, 0.3)' }}
        >
          Sovietalizer
        </h1>
      </div>

      <div className="w-full h-full">
        <Building3D onDoorClick={handleDoorClick} doorStates={doorStates} />
      </div>

      <div
        className="absolute bottom-4 left-0 right-0 z-10 flex justify-center"
        style={{ color: '#4a5a6a' }}
      >
        <p className="text-[10px] tracking-widest uppercase">
          Tap a floor · Open a door
        </p>
      </div>

      <RecommendationModal
        recommendationId={activeRecommendation}
        onClose={handleCloseModal}
      />
    </div>
  )
}
