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
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl"
            style={{ backgroundColor: '#0f1422', border: '1px solid #1a2240' }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="p-8">
              {categoryInfo && (
                <span
                  className="text-[11px] tracking-[0.25em] uppercase font-medium"
                  style={{ color: '#5a7a9a' }}
                >
                  {categoryInfo.labelRu} · {categoryInfo.label}
                </span>
              )}

              {loading && (
                <div className="flex justify-center py-12">
                  <div
                    className="w-7 h-7 rounded-full animate-spin"
                    style={{ border: '2px solid #1a2240', borderTopColor: '#5a7a9a' }}
                  />
                </div>
              )}

              {data && !loading && (
                <>
                  <h2
                    className="text-xl font-semibold mt-3 mb-4 leading-snug"
                    style={{ color: '#e8ecf4' }}
                  >
                    {data.title}
                  </h2>

                  {data.thumbnail && (
                    <div className="rounded-lg overflow-hidden mb-5 bg-[#080c18]">
                      <img
                        src={data.thumbnail.source}
                        alt={data.title}
                        className="w-full h-52 object-cover"
                      />
                    </div>
                  )}

                  <p className="text-sm leading-relaxed" style={{ color: '#b0b8cc' }}>
                    {data.extract}
                  </p>

                  {data.content_urls && (
                    <a
                      href={data.content_urls.desktop.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-xs underline hover:opacity-80 transition-opacity"
                      style={{ color: '#5a7a9a' }}
                    >
                      Read on Wikipedia
                    </a>
                  )}
                </>
              )}

              {!data && !loading && rec && (
                <p className="text-sm mt-3" style={{ color: '#6a7080' }}>
                  {rec.title}
                </p>
              )}
            </div>

            <div
              className="px-8 py-4"
              style={{ borderTop: '1px solid #1a2240' }}
            >
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors"
                style={{
                  backgroundColor: '#1a2240',
                  color: '#a8b0c8',
                }}
                onPointerEnter={(e) => { e.currentTarget.style.backgroundColor = '#2a3050' }}
                onPointerLeave={(e) => { e.currentTarget.style.backgroundColor = '#1a2240' }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
