'use client'

import { type TimeOfDay, timeLabels } from '@/lib/timeConfig'

const times: TimeOfDay[] = ['day', 'afternoon', 'night']

export default function TimeToggle({ time, onChange }: {
  time: TimeOfDay
  onChange: (t: TimeOfDay) => void
}) {
  const currentIdx = times.indexOf(time)

  return (
    <div
      className="flex items-center gap-1 rounded-full px-2 py-1"
      style={{ backgroundColor: 'rgba(15, 20, 34, 0.7)', border: '1px solid rgba(26, 34, 64, 0.6)' }}
    >
      {times.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300"
          style={{
            color: i === currentIdx ? '#e8ecf4' : '#4a5a6a',
            backgroundColor: i === currentIdx ? '#1a2240' : 'transparent',
          }}
        >
          {timeLabels[t].label}
        </button>
      ))}
    </div>
  )
}
