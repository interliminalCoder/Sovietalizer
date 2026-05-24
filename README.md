# Sovietalizer

Explore Soviet culture through a 3D brutalist building. Each floor has doors that reveal recommendations from Soviet cinema, music, literature, architecture and art — powered by the Wikipedia API.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| 3D Engine | React Three Fiber + Three.js |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Content | Wikipedia REST API |
| PWA | Service Worker + Web Manifest |
| Hosting | Vercel |

## Features

- **3D Soviet panel building** — Navigable brutalist architecture with floor sections, balcony slabs, and recessed windows
- **Interactive doors** — 12 apartment doors (3 per floor, 4 floors) with swing-open animation
- **Recommendations** — 30 curated Soviet cultural works across 5 categories
- **Wikipedia integration** — Fetches summary, image, and context on door open
- **Dynamic time** — Toggle between Day, Afternoon, and Night with changing lighting, lamp glow, and window illumination
- **Shadows** — Real-time shadow mapping on building, street, and lamp posts
- **Snow particles** — Falling snow with ground fade-out, atmospheric cold aesthetic
- **PWA** — Installable on mobile home screen

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, PWA manifest link
│   ├── page.tsx            # Main page: state management, time toggle, modal
│   └── globals.css         # Brutalist cold theme
├── components/
│   ├── Building3D.tsx      # Canvas, scene lights, time-based config
│   ├── Floor.tsx           # Single floor section (wall + seam + doors + balconies)
│   ├── Door.tsx            # 3D apartment door with panel detailing + open animation
│   ├── Balcony.tsx         # Concrete balcony slab with metal railing
│   ├── Window3D.tsx        # Recessed window frame with glass + night glow
│   ├── Street.tsx          # Snow-covered ground plane + lamp posts
│   ├── LampPost.tsx        # 3D lamp post with warm point light
│   ├── SnowParticles.tsx   # Falling snow particle system
│   ├── RecommendationModal.tsx  # Wikipedia content modal with scale animation
│   ├── TimeToggle.tsx      # Day/Afternoon/Night switcher
│   └── PwaRegister.tsx     # Service worker registration
├── lib/
│   ├── timeConfig.ts       # Time-of-day lighting presets
│   ├── recommendations.ts  # 30 curated Soviet works across 5 categories
│   └── wikipedia.ts        # Wikipedia REST API client
└── public/
    ├── manifest.json       # PWA manifest
    ├── sw.js               # Service worker
    └── icon-192.svg        # App icon
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npx vercel --prod
```

Or connect the GitHub repository to Vercel for auto-deploy on push.

## Categories

- **Cinema** — Tarkovsky, Eisenstein, Vertov
- **Music** — Shostakovich, Prokofiev, Red Army Choir
- **Literature** — Bulgakov, Solzhenitsyn, Akhmatova
- **Architecture** — Ostankino Tower, Moscow Metro, Palace of the Soviets
- **Art** — Malevich, Rodchenko, Tatlin

## Credits

Built with Next.js, React Three Fiber, and the Wikipedia API.
