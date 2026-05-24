'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import RecommendationModal from '@/components/RecommendationModal'
import TimeToggle from '@/components/TimeToggle'
import { type TimeOfDay } from '@/lib/timeConfig'
import { getRecommendationsForFloor } from '@/lib/recommendations'

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

export default function Home() {
  const [time, setTime] = useState<TimeOfDay>('day')
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
    <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: '#080c18' }}>
      <div className="absolute top-4 left-0 right-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <h1
          className="text-base font-bold tracking-[0.3em] uppercase pointer-events-auto"
          style={{ color: '#e8ecf4', textShadow: '0 0 20px rgba(0,0,0,0.5)' }}
        >
          Sovietalizer
        </h1>
        <div className="pointer-events-auto">
          <TimeToggle time={time} onChange={setTime} />
        </div>
      </div>

      <div className="w-full h-full">
        <Building3D
          onDoorClick={handleDoorClick}
          doorStates={doorStates}
          time={time}
        />
      </div>

      <div
        className="absolute bottom-5 left-0 right-0 z-10 flex justify-center pointer-events-none"
        style={{ color: '#6a7a8a' }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase">
          Tap a door · Discover Soviet culture
        </p>
      </div>

      <RecommendationModal
        recommendationId={activeRecommendation}
        onClose={handleCloseModal}
      />
    </div>
  )
}
