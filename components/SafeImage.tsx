'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef, memo } from 'react'

interface SafeImageProps {
  src: string
  fallbackSrc: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  priority?: boolean
}

function SafeImageComponent({
  src,
  fallbackSrc,
  alt,
  fill = false,
  width,
  height,
  className = '',
  style,
  priority = false,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const hasTriedFallback = useRef(false)
  const currentSrc = useRef(src)

  // Réinitialiser l'état si la source change
  useEffect(() => {
    if (currentSrc.current !== src) {
      currentSrc.current = src
      setImgSrc(src)
      hasTriedFallback.current = false
    }
  }, [src])

  const handleError = useCallback(() => {
    if (!hasTriedFallback.current && imgSrc !== fallbackSrc) {
      hasTriedFallback.current = true
      setImgSrc(fallbackSrc)
    }
  }, [imgSrc, fallbackSrc])

  const imageProps: any = {
    src: imgSrc,
    alt,
    className,
    style,
    priority,
    onError: handleError,
    unoptimized: imgSrc.endsWith('.svg') || fallbackSrc.endsWith('.svg'),
    loading: priority ? undefined : 'lazy',
  }

  if (fill) {
    imageProps.fill = true
  } else if (width && height) {
    imageProps.width = width
    imageProps.height = height
  }

  return <Image {...imageProps} />
}

export default memo(SafeImageComponent)

