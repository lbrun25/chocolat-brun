'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

interface VideoArticleProps {
  /** Vidéo MP4 (H.264) courte, sans son : elle tourne en boucle comme une photo animée */
  src: string
  /** Première image, affichée avant la lecture et si l'utilisateur limite les animations */
  poster: string
  width: number
  height: number
  /** Ce que montre la vidéo, pour les lecteurs d'écran */
  description: string
  legende?: string
}

/**
 * Vidéo courte dans le corps d'un article : muette, en boucle, lancée seule sauf si le visiteur
 * a demandé moins d'animations. Un bouton la met en pause (contenu animé de plus de 5 s).
 */
export function VideoArticle({ src, poster, width, height, description, legende }: VideoArticleProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [enLecture, setEnLecture] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {})
  }, [])

  const basculer = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <figure className="my-10">
      <div
        className="relative mx-auto overflow-hidden rounded-2xl border border-ink/[0.06] bg-cream"
        style={{ maxWidth: width >= height ? undefined : 380, aspectRatio: `${width} / ${height}` }}
      >
        <video
          ref={ref}
          src={src}
          poster={poster}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={description}
          onPlay={() => setEnLecture(true)}
          onPause={() => setEnLecture(false)}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={basculer}
          aria-label={enLecture ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-ivory backdrop-blur-sm transition-colors hover:bg-ink/80"
        >
          {enLecture ? (
            <Pause className="h-4 w-4" strokeWidth={2} aria-hidden />
          ) : (
            <Play className="h-4 w-4 translate-x-px" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>
      {legende && <figcaption className="mt-3 text-center text-[13px] text-bark">{legende}</figcaption>}
    </figure>
  )
}
