'use client'

import { useState } from 'react'
import MediaCard from '@/components/MediaCard'
import MediaLightbox from '@/components/MediaLightbox'

interface MediaItem {
  src: string
  alt: string
}

interface GalerieContentProps {
  media: MediaItem[]
}

export default function GalerieContent({ media }: GalerieContentProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const goPrev = () => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))
  const goNext = () =>
    setLightboxIndex((i) => (i !== null && i < media.length - 1 ? i + 1 : i))

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
        {media.map((item, index) => (
          <MediaCard
            key={item.src}
            src={item.src}
            alt={item.alt}
            delay={index * 0.05}
            aspectRatio="4/3"
            onOpen={() => openLightbox(index)}
          />
        ))}
      </div>

      <MediaLightbox
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        items={media}
        currentIndex={lightboxIndex ?? 0}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  )
}
