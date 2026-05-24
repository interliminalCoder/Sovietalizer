'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchWikipediaSummary, type WikipediaResponse } from '@/lib/wikipedia'
import { getRecommendationById, categories } from '@/lib/recommendations'

interface Props {
  recommendationId: string | null
  onClose: () => void
}

export default function RecommendationModal({ recommendationId, onClose }: Props) {
  const [data, setData] = useState<WikipediaResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const rec = recommendationId ? getRecommendationById(recommendationId) : null

  useEffect(() => {
    if (!rec) return
    setLoading(true)
    fetchWikipediaSummary(rec.wikipediaTitle).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [rec])

  const categoryInfo = rec ? categories.find((c) => c.id === rec.category) : null

  return (
    <AnimatePresence>
      {recommendationId && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-sm max-h-[80vh] overflow-y-auto rounded-lg p-6 shadow-2xl"
            style={{ backgroundColor: '#0f1422', border: '1px solid #1a2240' }}
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {categoryInfo && (
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: '#5a7a9a' }}
              >
                {categoryInfo.labelRu} · {categoryInfo.label}
              </span>
            )}

            {loading && (
              <div className="flex justify-center py-8">
                <div
                  className="w-6 h-6 rounded-full animate-spin"
                  style={{
                    border: '2px solid #1a2240',
                    borderTopColor: '#5a7a9a',
                  }}
                />
              </div>
            )}

            {data && !loading && (
              <>
                <h2 className="text-xl font-semibold mt-2 mb-3" style={{ color: '#e8ecf4' }}>
                  {data.title}
                </h2>

                {data.thumbnail && (
                  <div className="rounded-lg overflow-hidden mb-4 bg-[#080c18]">
                    <img
                      src={data.thumbnail.source}
                      alt={data.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <p className="text-sm leading-relaxed" style={{ color: '#a8b0c8' }}>
                  {data.extract}
                </p>

                {data.content_urls && (
                  <a
                    href={data.content_urls.desktop.page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs underline"
                    style={{ color: '#5a7a9a' }}
                  >
                    Read more on Wikipedia →
                  </a>
                )}
              </>
            )}

            {!data && !loading && rec && (
              <p className="text-sm mt-2" style={{ color: '#6a7080' }}>
                {rec.title}
              </p>
            )}

            <button
              onClick={onClose}
              className="w-full mt-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: '#1a2240',
                color: '#a8b0c8',
              }}
              onPointerEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a3050'
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1a2240'
              }}
            >
              Close the door
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
