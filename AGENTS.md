# Sovietalizer — Session Log

## Session 1 — 23 May 2026

### Stack decisions
- **Next.js 16** (App Router) + **TypeScript** over React Native (user has no RN experience)
- **React Three Fiber** for 3D brutalist building (user wanted realistic 3D)
- **Framer Motion** for UI animations
- **Tailwind CSS** for cold, monochromatic blue aesthetic
- **Wikipedia REST API** for automatic content generation
- **PWA** (service worker + manifest) for mobile installability
- **Vercel** for hosting

### Project setup
- Scaffolded Next.js with `create-next-app` (TypeScript, Tailwind, App Router, src/)
- Installed: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `@serwist/next`, `@types/three`

### Files created (12 source files)

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout, PWA metadata, manifest link |
| `src/app/page.tsx` | Main page, state for doors/time/modal, dynamic import of 3D scene |
| `src/app/globals.css` | Brutalist cold theme colors |
| `src/components/Building3D.tsx` | Canvas, scene orchestration, time-based lighting |
| `src/components/Floor.tsx` | Unified wall section + panel seam + 3 doors + 3 balconies |
| `src/components/Door.tsx` | Paneled apartment door with swing animation (hinge on left) |
| `src/components/Balcony.tsx` | Concrete slab + metal railing |
| `src/components/Window3D.tsx` | Recessed window with glass, frame, and night-time glow |
| `src/components/Street.tsx` | Snow-covered ground with lamp posts |
| `src/components/LampPost.tsx` | 3D pole + arm + glowing bulb + point light (time-aware) |
| `src/components/SnowParticles.tsx` | 600-particle system with y-based fade-out |
| `src/components/RecommendationModal.tsx` | Centered modal with scale+fade animation, Wikipedia content |
| `src/components/TimeToggle.tsx` | Day / Afternoon / Night selector |
| `src/components/PwaRegister.tsx` | Service worker registration |
| `src/lib/timeConfig.ts` | Lighting presets for 3 times of day |
| `src/lib/recommendations.ts` | 30 curated Soviet works (cinema, music, lit, architecture, art) |
| `src/lib/wikipedia.ts` | Wikipedia REST API summary fetcher |
| `public/manifest.json` | PWA manifest |
| `public/sw.js` | Cache-first service worker |
| `public/icon-192.svg` | Brutalist building silhouette icon |

### Iterations

1. **MVP** — 3D building with 4 floors, 12 doors, Wikipedia modal, snow, cold palette
2. **Darkness fix** — Increased lighting 2.5×, lightened materials, ACES tone mapping, removed fog
3. **Soviet street** — Snow-covered ground, 7 lamp posts with warm point lights (cold/warm contrast)
4. **Snow fade** — Particles now fade out smoothly near ground level
5. **Soviet panel building** — Unified wall structure, recessed windows, balcony slabs, panel seams
6. **Shadows** — Shadow mapping on all meshes, shadow-casting directional light
7. **Dynamic time** — Day/Afternoon/Night with distinct lighting, window glow, lamp intensity
8. **Minimalist modal** — Scale+fade animation (0.92→1), centered, minimal chrome

### Deployment
- Domain: https://sovietalizer.vercel.app
- GitHub: https://github.com/interliminalCoder/Sovietalizer
- Deploy via `npx vercel --prod --force`
- GitHub auto-deploy not yet connected (manual CLI deploys)

### Notes
- PWA service worker registered but icons are SVG (need PNG conversion for full PWA compliance)
- No sound design yet (wind, footsteps, door creak planned)
- Building texture detail can be increased with normal maps
- No analytics or backend — fully static + Wikipedia API
