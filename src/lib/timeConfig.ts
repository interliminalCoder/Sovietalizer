export type TimeOfDay = 'day' | 'afternoon' | 'night'

export interface TimeConfig {
  background: string
  ambient: { intensity: number; color: string }
  directional1: { position: [number, number, number]; intensity: number; color: string }
  directional2: { position: [number, number, number]; intensity: number; color: string }
  hemi: { sky: string; ground: string; intensity: number }
  lampIntensity: number
  windowLight: boolean
  streetColor: string
  exposure: number
}

export const timeConfigs: Record<TimeOfDay, TimeConfig> = {
  day: {
    background: '#5a7a9a',
    ambient: { intensity: 0.5, color: '#8aabcc' },
    directional1: { position: [8, 14, 6], intensity: 0.9, color: '#ddeeff' },
    directional2: { position: [-6, 10, -4], intensity: 0.25, color: '#8899bb' },
    hemi: { sky: '#88bbdd', ground: '#445566', intensity: 0.5 },
    lampIntensity: 0.15,
    windowLight: false,
    streetColor: '#6a7080',
    exposure: 1.1,
  },
  afternoon: {
    background: '#7a6a4a',
    ambient: { intensity: 0.45, color: '#ccaa88' },
    directional1: { position: [4, 8, 10], intensity: 0.8, color: '#ffcc88' },
    directional2: { position: [-5, 6, -6], intensity: 0.2, color: '#887799' },
    hemi: { sky: '#ccaa88', ground: '#554433', intensity: 0.4 },
    lampIntensity: 0.3,
    windowLight: false,
    streetColor: '#7a7a6a',
    exposure: 1.0,
  },
  night: {
    background: '#080c18',
    ambient: { intensity: 0.35, color: '#3a4a6a' },
    directional1: { position: [6, 12, 5], intensity: 0.15, color: '#445577' },
    directional2: { position: [-4, 8, -3], intensity: 0.08, color: '#334466' },
    hemi: { sky: '#1a2240', ground: '#0a0a1a', intensity: 0.3 },
    lampIntensity: 1.2,
    windowLight: true,
    streetColor: '#3a3a4a',
    exposure: 0.8,
  },
}

export const timeLabels: Record<TimeOfDay, { label: string; labelRu: string }> = {
  day: { label: 'Day', labelRu: 'День' },
  afternoon: { label: 'Afternoon', labelRu: 'Вечер' },
  night: { label: 'Night', labelRu: 'Ночь' },
}
