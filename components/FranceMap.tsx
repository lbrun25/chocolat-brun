'use client'

/**
 * Carte de France réaliste : départements (GeoJSON), montagnes, bordure noire, point Charquemont.
 */
import { useEffect, useState, useMemo } from 'react'

// Bounds France métropolitaine (approx.)
const BOUNDS = {
  minLon: -5.5,
  maxLon: 9.6,
  minLat: 41.3,
  maxLat: 51.1,
}
const W = 480
const H = 560

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * W
  const y = (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * H
  return [x, y]
}

// Charquemont 47.1286°N, 6.8222°E
const CHARQUEMONT = project(6.8222, 47.1286)
// Flèche : du point rouge (Charquemont) vers le texte "Fabriqué ici, par nous !"
const ARROW_END: [number, number] = [W / 2, H - 5]
const ARROW_CP: [number, number] = [W * 0.4, (CHARQUEMONT[1] + ARROW_END[1]) / 2] // point de contrôle de la courbe
const ARROW_HEAD_SIZE = 14
const VIEWBOX_W = W

type GeoJsonFeature = {
  type: string
  geometry: { type: string; coordinates: number[][][] | number[][][][] }
  properties?: { code?: string; nom?: string }
}

type GeoJson = {
  type: string
  features: GeoJsonFeature[]
}

function coordsToPath(rings: number[][][]): string {
  return rings
    .map((ring) => {
      if (!ring.length) return ''
      const [fx, fy] = project(ring[0][0], ring[0][1])
      let d = `M ${fx} ${fy}`
      for (let i = 1; i < ring.length; i++) {
        const [x, y] = project(ring[i][0], ring[i][1])
        d += ` L ${x} ${y}`
      }
      return d + ' Z'
    })
    .join(' ')
}

// Couleurs douces par "région" (code département) pour varier les départements
function getDeptColor(code: string): string {
  const n = parseInt(code, 10) || 0
  const palette = [
    '#f2ebe0', '#e8e0d5', '#e0d8cc', '#d8cfc4', '#ede6dc',
    '#e4ddd2', '#dcd4c9', '#f0e9df', '#e6dfd4', '#ddd5ca',
  ]
  return palette[n % palette.length]
}

// Zones montagneuses simplifiées (polygones approximatifs) [lon, lat][]
const MOUNTAINS: { name: string; coords: [number, number][] }[] = [
  // Alpes (est)
  { name: 'Alpes', coords: [[6.0, 46.0], [7.0, 45.2], [6.8, 44.0], [6.2, 43.5], [5.8, 44.2], [6.0, 45.2], [6.0, 46.0]] },
  // Pyrénées
  { name: 'Pyrénées', coords: [[3.0, 42.5], [1.5, 42.8], [0.2, 42.8], [-1.0, 43.0], [-0.5, 43.3], [1.0, 43.0], [2.5, 42.7], [3.0, 42.5]] },
  // Massif central
  { name: 'Massif central', coords: [[2.5, 46.2], [3.2, 45.5], [3.0, 44.8], [2.4, 45.0], [2.2, 45.8], [2.5, 46.2]] },
  // Jura (près de Charquemont)
  { name: 'Jura', coords: [[5.4, 47.0], [6.2, 46.5], [6.5, 47.2], [6.0, 47.5], [5.5, 47.3], [5.4, 47.0]] },
]

export default function FranceMap() {
  const [geo, setGeo] = useState<GeoJson | null>(null)

  useEffect(() => {
    fetch('/geo/departements.json')
      .then((r) => r.json())
      .then(setGeo)
      .catch(() => setGeo(null))
  }, [])

  const paths = useMemo(() => {
    if (!geo?.features) return []
    const isMetropolitan = (code: string) => {
      // Exclure la Corse (2A, 2B) — uniquement France hexagonale
      if (code === '2A' || code === '2B') return false
      const n = parseInt(code, 10)
      return n >= 1 && n <= 95
    }
    return geo.features
      .filter((f) => isMetropolitan(String(f.properties?.code || '')))
      .map((f) => {
        const g = f.geometry
        const code = f.properties?.code || ''
        let path = ''
        if (g.type === 'Polygon' && Array.isArray(g.coordinates)) {
          path = coordsToPath(g.coordinates as number[][][])
        } else if (g.type === 'MultiPolygon' && Array.isArray(g.coordinates)) {
          path = (g.coordinates as number[][][][]).map((poly) => coordsToPath(poly)).join(' ')
        }
        return { path, code }
      })
  }, [geo])

  const mountainPaths = useMemo(
    () =>
      MOUNTAINS.map((m) => {
        if (m.coords.length < 3) return ''
        const pts = m.coords.map(([lon, lat]) => project(lon, lat))
        return `M ${pts[0][0]} ${pts[0][1]} ${pts.slice(1).map(([x, y]) => `L ${x} ${y}`).join(' ')} Z`
      }),
    []
  )

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto mt-12">
      <figure className="w-full" aria-label="Carte de France — Fabriqué à Charquemont">
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${H}`}
          className="w-full h-auto max-h-[320px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="map-clip">
              <rect x="0" y="0" width={W} height={H} />
            </clipPath>
            <filter id="france-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="4" dy="6" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Départements (contours + couleurs) — clip pour ne pas dépasser la carte */}
          <g clipPath="url(#map-clip)">
          <g filter="url(#france-shadow)">
            {paths.map(({ path, code }) => (
              <path
                key={code}
                d={path}
                fill={getDeptColor(code)}
                stroke="#1a1a1a"
                strokeWidth="1.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Montagnes (zones ombrées) */}
          <g opacity="0.5">
            {mountainPaths.map(
              (d, i) =>
                d && (
                  <path
                    key={MOUNTAINS[i].name}
                    d={d}
                    fill="#6b5b4f"
                    stroke="#4a4038"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                  />
                )
            )}
          </g>

          {/* Point Charquemont */}
          <g>
            <circle
              cx={CHARQUEMONT[0]}
              cy={CHARQUEMONT[1]}
              r="6"
              fill="#E30613"
              stroke="#1a1a1a"
              strokeWidth="1.5"
            />
            <circle cx={CHARQUEMONT[0]} cy={CHARQUEMONT[1]} r="2" fill="#fff" />
            <text
              x={CHARQUEMONT[0] + 10}
              y={CHARQUEMONT[1] + 4}
              fontSize="10"
              fontWeight="600"
              fill="#1a1a1a"
              fontFamily="system-ui, sans-serif"
            >
              Charquemont
            </text>
          </g>
          </g>

          {/* Flèche du point rouge vers le texte — sans carré ni bord noir */}
          <g aria-hidden>
            {/* Courbe de Charquemont vers le bas (centre) */}
            <path
              d={`M ${CHARQUEMONT[0]} ${CHARQUEMONT[1]} Q ${ARROW_CP[0]} ${ARROW_CP[1]} ${ARROW_END[0]} ${ARROW_END[1] - ARROW_HEAD_SIZE}`}
              fill="none"
              stroke="#3B1E12"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pointe de flèche */}
            <path
              d={`M ${ARROW_END[0] - ARROW_HEAD_SIZE} ${ARROW_END[1] - ARROW_HEAD_SIZE} L ${ARROW_END[0]} ${ARROW_END[1]} L ${ARROW_END[0] + ARROW_HEAD_SIZE} ${ARROW_END[1] - ARROW_HEAD_SIZE} Z`}
              fill="#3B1E12"
            />
          </g>
        </svg>
        <p
          className="text-center mt-1 -mb-1 font-[family-name:var(--font-dancing-script)] text-black"
          style={{
            fontFamily: 'var(--font-dancing-script), "Dancing Script", cursive',
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          Maîtrise artisanale, production locale !
        </p>
        <div className="flex w-full max-w-[280px] mx-auto mt-3 h-2 rounded-sm overflow-hidden border border-black/20">
          <span className="flex-1 bg-[#002395]" aria-hidden />
          <span className="flex-1 bg-white" aria-hidden />
          <span className="flex-1 bg-[#ED2939]" aria-hidden />
        </div>
      </figure>
    </div>
  )
}
