'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Play } from 'lucide-react'
import MediaLightbox from '@/components/MediaLightbox'
import { isVideo } from '@/components/MediaCard'
import { Reveal } from '@/components/site/Reveal'

interface MediaItem {
  src: string
  alt: string
}

interface GalerieContentProps {
  media: MediaItem[]
}

export default function GalerieContent({ media }: GalerieContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const goPrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))
  const goNext = () =>
    setLightboxIndex((i) => (i !== null && i < media.length - 1 ? i + 1 : i))

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
        {media.map((item, index) => (
          <li key={item.src}>
            <Reveal delay={(index % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={isVideo(item.src) ? `Lire la vidéo : ${item.alt}` : `Agrandir : ${item.alt}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink/[0.08] bg-paper"
              >
                {isVideo(item.src) ? (
                  <>
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden
                      className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/20">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-card">
                        <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden />
                      </span>
                    </span>
                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <MediaLightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={media}
        currentIndex={lightboxIndex ?? 0}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  )
}
